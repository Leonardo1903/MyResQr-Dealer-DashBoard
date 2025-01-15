import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { FileText, Download } from "lucide-react";

const policies = [
  {
    index: 1,
    pin: "10000001",
    salesPerson: "fga48hdd",
    customerName: "RuJuydi",
    saleDate: "11 Dec, 2024",
    startDate: "11 Dec, 2024",
    endDate: "11 Dec, 2025",
    status: "ACTIVE",
  },
  {
    index: 2,
    pin: "10000002",
    salesPerson: "ka0edadk",
    customerName: "aJejc",
    saleDate: "09 Dec, 2024",
    startDate: "09 Dec, 2024",
    endDate: "09 Dec, 2025",
    status: "ACTIVE",
  },
  {
    index: 3,
    pin: "10000003",
    salesPerson: "84673932-0",
    customerName: "kJsh",
    saleDate: "02 Dec, 2024",
    startDate: "02 Dec, 2024",
    endDate: "02 Dec, 2025",
    status: "ACTIVE",
  },
];

export function PolicyTable() {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pin </TableHead>
            <TableHead>Sales Person</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Sale Date</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy.index}>
              <TableCell>{policy.pin}</TableCell>
              <TableCell>{policy.salesPerson}</TableCell>
              <TableCell>{policy.customerName}</TableCell>
              <TableCell>{policy.saleDate}</TableCell>
              <TableCell>{policy.startDate}</TableCell>
              <TableCell>{policy.endDate}</TableCell>
              <TableCell>
                <Badge variant="success" className="bg-emerald-500">
                  {policy.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
