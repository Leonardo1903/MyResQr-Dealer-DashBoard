import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Calendar } from "lucide-react";
import { DatePicker } from "../components/ui/date-picker";

export function SearchForm() {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">Search Policy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input placeholder="Sales Person" />
        <Input placeholder="PIN #" />
        <Input placeholder="User Name" />
        <div className="flex items-center gap-2">
          <DatePicker placeholder="Start Date" />
        </div>
        <div className="flex items-center gap-2">
          <DatePicker placeholder="End Date" />
        </div>
        <Select>
          <option value="">--All--</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Submit Search</Button>
        <Button variant="outline">Clear Search</Button>
        <Button
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Excel Download
        </Button>
      </div>
    </div>
  );
}
