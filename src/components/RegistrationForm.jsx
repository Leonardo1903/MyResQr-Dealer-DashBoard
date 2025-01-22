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
import { useRecoilValue } from "recoil";
import { accessTokenAtom, Dealer_nameAtom } from "../store/UserAtoms";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

export default function RegistrationForm({ onSubmit }) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const dealerName = useRecoilValue(Dealer_nameAtom);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      affilatedTo: dealerName,
      phone_number: "",
      createdBy: "",
      fullname: "",
      email_id: "",
      dob: "",
      gender: "",
      family_phone1: "",
      family_phone2: "",
      friend_phone1: "",
      friend_phone2: "",
      image: "",
      PIN: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.post(
        `${baseUrl}/dealer/create-user/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast({
        title: "Registration Successful",
        description: response.message,
        variant: "default",
      });

      // PIN Activation
      try {
        const response = await axios.post(`${baseUrl}/dealer/request-activation/`) //AUth header may have to be added...

        toast({
          title: "PIN Activation",
          description: response.message,
          variant: "default",
        })

      } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.detail || error.response?.data.error;
        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      onSubmit(response.data);
      form.reset();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.detail || error.response?.data.error;
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg my-10">
      <CardHeader>
        <CardTitle className="text-blue-600 text-center text-xl">
          User Registration Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/** PIN */}
              <FormField
                control={form.control}
                name="PIN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliated To</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter PIN"
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Phone Number */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="Enter phone number"
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Created By */}
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created By</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Creator name"
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Full Name */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter full name"
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Email ID */}
              <FormField
                control={form.control}
                name="email_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email ID</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Enter email ID"
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/** Date of Birth */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
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

              {/** Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
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

              {/** Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
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

            {/** Emergency Contacts */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">
                Emergency Contacts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {["family_phone1", "family_phone2", "friend_phone1", "friend_phone2"].map(
                  (key, index) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {`Emergency Contact ${index + 1}`}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Enter contact ${index + 1}`}
                              className="border-blue-200 focus:border-blue-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )}
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
