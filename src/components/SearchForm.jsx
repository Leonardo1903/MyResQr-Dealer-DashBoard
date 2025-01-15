import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Calendar } from "lucide-react";
import { DatePicker } from "../components/ui/date-picker";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Label } from "../components/ui/label";

export function SearchForm() {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">Search Policy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Label>Sales Person</Label>
          <Input placeholder="Sales Person" />
        </div>
        <div>
          <Label>PIN</Label>
          <Input placeholder="PIN" />
        </div>
        <div>
          <Label>User Name</Label>
          <Input placeholder="User Name" />
        </div>
        <div>
          <Label>Start Date</Label>
          <DatePicker placeholder="Start Date" />
        </div>
        <div>
          <Label>End Date</Label>
          <DatePicker placeholder="End Date" />
        </div>
        <div>
          <Label>Status</Label>
          <Select>
            <SelectTrigger>
              <option value="">--All--</option>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
