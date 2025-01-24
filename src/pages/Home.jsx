"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

// Dummy incentive scheme data
const incentiveScheme = {
  week: { target: 50, achieved: 0 },
  month: { target: 100, achieved: 0 },
  year: { target: 500, achieved: 0 },
};

export default function SalesDashboard() {
  const baseUrl = "http://3.108.8.215/api/v1";
  const accessToken = sessionStorage.getItem("accessToken");
  const [timeRange, setTimeRange] = useState("week");
  const [salesData, setSalesData] = useState({
    total_users: 0,
    sales_person_stats: {},
  });

  const fetchSalesData = async (range) => {
    try {
      const response = await axios.get(
        `${baseUrl}/dealer/get-sales-stats/2/?filter=${range}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData(timeRange);
  }, [timeRange]);

  const totalSales = salesData.total_users;
  const salesPersonStats = salesData.sales_person_stats;
  const showroomSales = salesPersonStats.agni || 0; // Example for one sales person

  // Update incentive scheme achieved value
  incentiveScheme[timeRange].achieved = totalSales;

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen px-10">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Week till date policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showroomSales}</div>
          </CardContent>
        </Card>
        <Card className="text-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Policy sold till date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Incentive Scheme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {incentiveScheme[timeRange].achieved}
            </div>
            <Badge className="mt-2">
              {incentiveScheme[timeRange].achieved >=
              incentiveScheme[timeRange].target
                ? "Incentive Achieved!"
                : `Achieve ${
                    incentiveScheme[timeRange].target -
                    incentiveScheme[timeRange].achieved
                  } more for incentive`}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Buttons */}
      <div className="flex gap-4">
        <Button
          variant={timeRange === "week" ? "default" : "outline"}
          onClick={() => setTimeRange("week")}
        >
          Week till date
        </Button>
        <Button
          variant={timeRange === "month" ? "default" : "outline"}
          onClick={() => setTimeRange("month")}
        >
          Month till date
        </Button>
        <Button
          variant={timeRange === "year" ? "default" : "outline"}
          onClick={() => setTimeRange("year")}
        >
          Year till date
        </Button>
      </div>

      {/* Graph Section */}
      <Card>
        <CardHeader>
          <CardTitle>POLICY SOLD TILL DATE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(salesPersonStats).map(([name, value]) => ({
                  name,
                  value,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}