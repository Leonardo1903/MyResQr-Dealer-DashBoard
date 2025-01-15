import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

export default function RegistrationForm({ onSubmit }) {
  const form = useForm({
    defaultValues: {
      salesPersonName: "",
      pin: "",
      activationCode : "",
      userName: "",
      userMobile: "",
      userEmail: "",
      userDOB: "",
      userGender: "",
      userPhoto: "",
      aadhaarFront: "",
      aadhaarBack: "",
      emergencyContact1: "",
      emergencyContact2: "",
      emergencyContact3: "",
      emergencyContact4: "",
      emergencyContact5: "",
      emergencyContact6: "",
    },
  });

  const handleSubmit = (data) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg my-10">
      <CardHeader className="">
        <CardTitle className="text-blue-600 text-center">
          User Registration Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="salesPersonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Person Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIN *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activation Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userMobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Mobile*</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userDOB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User DOB *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Gender *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Choose gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userPhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Photo *</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadhaarFront"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Aadhaar Front *</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadhaarBack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Aadhaar Back *</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        {...field}
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">
                User Emergency Contacts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="emergencyContact1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact 1 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact 2 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact 3 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact 4 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact 5 (optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContact6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact 6 (optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}