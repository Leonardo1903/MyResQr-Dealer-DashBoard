import React from "react";
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
import { Dealer_nameAtom } from "../store/UserAtoms";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm({ onSubmit }) {
  const { toast } = useToast();
  const accessToken = sessionStorage.getItem("accessToken");
  const dealerName = useRecoilValue(Dealer_nameAtom);
  const navigate = useNavigate();
  const baseUrl = "http://3.108.8.215/api/v1";
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
      family_name1: "",
      family_relation1: "",
      family_phone2: "",
      family_name2: "",
      family_relation2: "",
      friend_phone1: "",
      friend_name1: "",
      friend_relation1: "",
      friend_phone2: "",
      friend_name2: "",
      friend_relation2: "",
      image: "",
      adhaar_front: "",
      adhaar_back: "",
      PIN: "",
      key: "",
      nomine: "",
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

      console.log("Registration Response:", response.data.message);

      toast({
        title: "Registration Successful",
        description: response.data.message,
        variant: "default",
      });

      if (response.data.message === "User already exists.") {
        toast({
          title: "Registration Failed",
          description: response.data.message,
          variant: "destructive",
        });
        return;
      }

      // PIN Activation
      console.log("Response Data : ", response.data);
      try {
        const activationResponse = await axios.post(
          `${baseUrl}/dealer/request-activation/`,
          {
            pin: data.PIN,
            key: data.key,
            profile_id: response.data.profile.id,
            activated_by: data.createdBy,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        toast({
          title: "PIN Activation request sent",
          description: activationResponse.data.message,
          variant: "default",
        });

        navigate("/dashboard");
      } catch (activationError) {
        console.error("Activation Error:", activationError);
        const errorMessage =
          activationError.response?.data?.detail ||
          activationError.response?.data.error;
        toast({
          title: "PIN Activation request Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      form.reset();
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMessage =
        error.response?.data?.detail || error.response?.data.error;
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
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/** PIN */}
              <FormField
                control={form.control}
                name="PIN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter PIN Number</FormLabel>
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
              {/** PIN */}
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Activation Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Activation Code"
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
                    <FormLabel>Sales Person Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Sales Person name"
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
                    <FormLabel>Email ID (Optional)</FormLabel>
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
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
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

              {/** Aadhaar Card */}
              <FormField
                control={form.control}
                name="adhaar_front"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhaar Card Front</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf,image/*"
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
                name="adhaar_back"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhaar Card Back</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf,image/*"
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
              <div className="flex flex-wrap gap-2 mt-4">
                {["family", "friend"].map((type) =>
                  [1, 2].map((index) => (
                    <React.Fragment key={`${type}_phone${index}`}>
                      <div className="flex flex-col w-full">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full md:w-1/3">
                              <FormField
                                control={form.control}
                                name={`${type}_name${index}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{`Emergency Contact ${index} Name`}</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder={`Enter contact ${index} name`}
                                        className="border-blue-200 focus:border-blue-400"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col w-full md:w-1/3">
                              <FormField
                                control={form.control}
                                name={`${type}_phone${index}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{`Emergency Contact ${index} Phone`}</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder={`Enter contact ${index} phone`}
                                        className="border-blue-200 focus:border-blue-400"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex flex-col w-full md:w-1/3">
                              <FormField
                                control={form.control}
                                name={`${type}_relation${index}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{`Relation`}</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="border-blue-200 focus:border-blue-400">
                                          <SelectValue placeholder="Select relation" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="Father">
                                          Father
                                        </SelectItem>
                                        <SelectItem value="Mother">
                                          Mother
                                        </SelectItem>
                                        <SelectItem value="Sibling">
                                          Sibling
                                        </SelectItem>
                                        <SelectItem value="Friend">
                                          Friend
                                        </SelectItem>
                                        <SelectItem value="Other">
                                          Other
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Nominee</h3>
              <FormField
                control={form.control}
                name="nomine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Nominee</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Choose nominee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["family", "friend"].map((type) =>
                          [1, 2].map((index) => {
                            const nomineeName = form.getValues(`${type}_name${index}`);
                            return nomineeName ? (
                              <SelectItem
                                key={`${type}_name${index}`}
                                value={nomineeName}
                              >
                                {nomineeName}
                              </SelectItem>
                            ) : null;
                          })
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
