'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

// Dummy data for different time periods
const weekData = [
  { name: 'Mon', Showroom: 4, Workshop: 3, Total: 7 },
  { name: 'Tue', Showroom: 3, Workshop: 2, Total: 5 },
  { name: 'Wed', Showroom: 5, Workshop: 4, Total: 9 },
  { name: 'Thu', Showroom: 2, Workshop: 3, Total: 5 },
  { name: 'Fri', Showroom: 4, Workshop: 2, Total: 6 },
]

const monthData = [
  { name: 'Week 1', Showroom: 15, Workshop: 12, Total: 27 },
  { name: 'Week 2', Showroom: 12, Workshop: 10, Total: 22 },
  { name: 'Week 3', Showroom: 18, Workshop: 15, Total: 33 },
  { name: 'Week 4', Showroom: 14, Workshop: 11, Total: 25 },
]

const yearData = [
  { name: 'Jan', Showroom: 45, Workshop: 38, Total: 83 },
  { name: 'Feb', Showroom: 52, Workshop: 43, Total: 95 },
  { name: 'Mar', Showroom: 48, Workshop: 40, Total: 88 },
  { name: 'Apr', Showroom: 55, Workshop: 45, Total: 100 },
]

// Dummy incentive scheme data
const incentiveScheme = {
  week: { target: 50, achieved: 0 },
  month: { target: 100, achieved: 0 },
  year: { target: 500, achieved: 0 },
}

export default function SalesDashboard() {
  const [timeRange, setTimeRange] = useState('week')

  const getDataForRange = (range) => {
    switch (range) {
      case 'week':
        return weekData
      case 'month':
        return monthData
      case 'year':
        return yearData
      default:
        return weekData
    }
  }

  const currentData = getDataForRange(timeRange)
  const totalSales = currentData.reduce((sum, item) => sum + item.Total, 0)
  const showroomSales = currentData.reduce((sum, item) => sum + item.Showroom, 0)
  const workshopSales = currentData.reduce((sum, item) => sum + item.Workshop, 0)

  // Update incentive scheme achieved value
  incentiveScheme[timeRange].achieved = totalSales

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen px-10">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Week till date policy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showroomSales}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Month till date policy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workshopSales}</div>
          </CardContent>
        </Card>
        <Card className="text-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Policy sold till date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incentive Scheme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {incentiveScheme[timeRange].achieved}
            </div>
            <Badge className="mt-2">
              {incentiveScheme[timeRange].achieved >= incentiveScheme[timeRange].target
                ? 'Incentive Achieved!'
                : `Achieve ${incentiveScheme[timeRange].target - incentiveScheme[timeRange].achieved} more for incentive`}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Buttons */}
      <div className="flex gap-4">
        <Button 
          variant={timeRange === 'week' ? 'default' : 'outline'}
          onClick={() => setTimeRange('week')}
        >
          Week till date
        </Button>
        <Button 
          variant={timeRange === 'month' ? 'default' : 'outline'}
          onClick={() => setTimeRange('month')}
        >
          Month till date
        </Button>
        <Button 
          variant={timeRange === 'year' ? 'default' : 'outline'}
          onClick={() => setTimeRange('year')}
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
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="Showroom" fill="#3b82f6" />
                <Bar dataKey="Workshop" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}