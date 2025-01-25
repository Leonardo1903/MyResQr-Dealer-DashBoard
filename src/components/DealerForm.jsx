import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
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
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { useToast } from "../hooks/use-toast";

export default function DealerKYCForm({ onSubmit }) {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      dealershipName: "",
      dealerAddress: "",
      billingAddress: "",
      gstin: "",
      cin: "",
      directors: [{ name: "", number: "", email: "" }],
      ownerName: "",
      ownerMobile: "",
      ownerEmail: "",
      dealerSPOCName: "",
      dealerSPOCNumber: "",
      numberOfShowrooms: "",
      shipping: "",
      showrooms: [{ address: "", managerName: "", managerNumber: "" }],
      bankDetails: {
        bankName: "",
        branchAddress: "",
        ifscCode: "",
        accountNumber: "",
        accountName: "",
      },
      // businessDocuments: null,
    },
  });

  const { fields: directorFields, append: appendDirector } = useFieldArray({
    control: form.control,
    name: "directors",
  });

  const {
    fields: showroomFields,
    append: appendShowroom,
    remove: removeShowroom,
  } = useFieldArray({
    control: form.control,
    name: "showrooms",
  });

  const numberOfShowrooms = form.watch("numberOfShowrooms");

  useEffect(() => {
    const currentShowrooms = showroomFields.length;
    const targetShowrooms = parseInt(numberOfShowrooms) || 0;

    if (targetShowrooms > currentShowrooms) {
      for (let i = currentShowrooms; i < targetShowrooms; i++) {
        appendShowroom({ address: "", managerName: "", managerNumber: "" });
      }
    } else if (targetShowrooms < currentShowrooms) {
      for (let i = currentShowrooms; i > targetShowrooms; i--) {
        removeShowroom(i - 1);
      }
    }
  }, [
    numberOfShowrooms,
    showroomFields.length,
    appendShowroom,
    removeShowroom,
  ]);

  const handleSubmit = async (data) => {
    // Validate that no empty values are present
    const validateFields = (obj) => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object" && value !== null) {
          if (!validateFields(value)) return false;
        } else if (!value) {
          toast({
            title: "Validation Error",
            description: `The field "${key}" cannot be empty.`,
            variant: "destructive",
          });
          return false;
        }
      }
      return true;
    };

    if (!validateFields(data)) {
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "businessDocuments") {
        formData.append(key, data[key]);
      } else if (typeof data[key] === "object" && data[key] !== null) {
        Object.keys(data[key]).forEach((subKey) => {
          formData.append(`${key}[${subKey}]`, data[key][subKey]);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    const formattedData = {
      dealership_name: data.dealershipName,
      dealer_address: data.dealerAddress,
      billing_address: data.billingAddress,
      gstin: data.gstin,
      cin: data.cin,
      directors: data.directors,
      owner_name: data.ownerName,
      owner_mobile: data.ownerMobile,
      owner_email: data.ownerEmail,
      dealer_spoc_name: data.dealerSPOCName,
      dealer_spoc_number: data.dealerSPOCNumber,
      number_of_showrooms: data.numberOfShowrooms,
      shipping: data.shipping,
      showrooms: data.showrooms,
      bank_details: {
        bank_name: data.bankDetails.bankName,
        branch_name: data.bankDetails.branchAddress,
        ifsc_code: data.bankDetails.ifscCode,
        account_number: data.bankDetails.accountNumber,
        account_name: data.bankDetails.accountName,
      },
    };

    onSubmit(formattedData);
    form.reset();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg my-10">
      <CardHeader className="">
        <CardTitle className="text-blue-600 text-center">
          Dealer KYC Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="dealershipName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dealership Name *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="dealerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dealer Address *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="billingAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="gstin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GSTIN *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="cin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        CIN (in case of LLP/ Pvt Ltd/ Ltd) *
                      </FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="businessDocuments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Business Documents *</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf,image/*"
                          onChange={(e) => field.onChange(e.target.files[0])}
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <h3 className="text-lg font-medium text-gray-900">Directors</h3>
                {directorFields.map((item, index) => (
                  <div key={item.id} className="flex flex-wrap gap-6 mt-4">
                    <div className="flex flex-col w-full md:w-1/3">
                      <FormField
                        control={form.control}
                        name={`directors.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Director Name *</FormLabel>
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
                    <div className="flex flex-col w-full md:w-1/3">
                      <FormField
                        control={form.control}
                        name={`directors.${index}.number`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Director Number *</FormLabel>
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
                    <div className="flex flex-col w-full md:w-1/3">
                      <FormField
                        control={form.control}
                        name={`directors.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Director Email *</FormLabel>
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
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    appendDirector({ name: "", number: "", email: "" })
                  }
                  className="mt-4"
                >
                  Add Director
                </Button>
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner/ MD/ CEO Name *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="ownerMobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner/ MD/ CEO Mobile Number *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="ownerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner/ MD/ CEO Email *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="dealerSPOCName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dealer SPOC Name *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="dealerSPOCNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dealer SPOC Number *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="numberOfShowrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Showrooms *</FormLabel>
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

              <div className="flex flex-col w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="shipping"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping (central/ showroom) *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-400">
                            <SelectValue>
                              {field.value
                                ? field.value.charAt(0).toUpperCase() +
                                  field.value.slice(1)
                                : "Choose shipping method"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="central">Central</SelectItem>
                            <SelectItem value="showroom">Showroom</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <h3 className="text-lg font-medium text-gray-900">Showrooms</h3>
                {showroomFields.map((item, index) => (
                  <div key={item.id} className="flex flex-wrap gap-6 mt-4">
                    <div className="flex flex-col w-full md:w-1/3">
                      <FormField
                        control={form.control}
                        name={`showrooms.${index}.address`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Showroom Address *</FormLabel>
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
                    <div className="flex flex-col w-full md:w-1/3">
                      <FormField
                        control={form.control}
                        name={`showrooms.${index}.managerName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Showroom Manager Name *</FormLabel>
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
                    <div className="flex flex-col w-full md:w-1/3">
                      <FormField
                        control={form.control}
                        name={`showrooms.${index}.managerNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Showroom Manager Number *</FormLabel>
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
                ))}
              </div>

              <div className="w-full">
                <h3 className="text-lg font-medium text-gray-900">
                  Bank Details
                </h3>
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex flex-col w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="bankDetails.bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name *</FormLabel>
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
                  <div className="flex flex-col w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="bankDetails.branchAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Name & Address *</FormLabel>
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
                  <div className="flex flex-col w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="bankDetails.ifscCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code *</FormLabel>
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
                  <div className="flex flex-col w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="bankDetails.accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number *</FormLabel>
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
                  <div className="flex flex-col w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="bankDetails.accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Name *</FormLabel>
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
