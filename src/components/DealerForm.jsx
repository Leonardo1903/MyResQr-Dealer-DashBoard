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

export default function DealerKYCForm({ onSubmit }) {
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
      dealerSPOC: "",
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
    },
  });

  const { fields: directorFields, append: appendDirector } = useFieldArray({
    control: form.control,
    name: "directors",
  });

  const { fields: showroomFields, append: appendShowroom, remove: removeShowroom } = useFieldArray({
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
  }, [numberOfShowrooms, showroomFields.length, appendShowroom, removeShowroom]);

  const handleSubmit = (data) => {
    onSubmit(data);
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
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dealershipName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealership Name *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dealerAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealer Address *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Address *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTIN *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIN (in case of LLP/ Pvt Ltd/ Ltd) *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900">Directors</h3>
                {directorFields.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <FormField
                      control={form.control}
                      name={`directors.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Director Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-blue-200 focus:border-blue-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`directors.${index}.number`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Director Number *</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-blue-200 focus:border-blue-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`directors.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Director Email *</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-blue-200 focus:border-blue-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button type="button" onClick={() => appendDirector({ name: "", number: "", email: "" })} className="mt-4">
                  Add Director
                </Button>
              </div>

              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner/ MD/ CEO Name *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownerMobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner/ MD/ CEO Mobile Number *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner/ MD/ CEO Email *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dealerSPOC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dealer SPOC Name & Number *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfShowrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Showrooms *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shipping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping (central/ showroom) *</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-blue-200 focus:border-blue-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900">Showrooms</h3>
                {showroomFields.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <FormField
                      control={form.control}
                      name={`showrooms.${index}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Showroom Address *</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-blue-200 focus:border-blue-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`showrooms.${index}.managerName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Showroom Manager Name *</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-blue-200 focus:border-blue-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`showrooms.${index}.managerNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Showroom Manager Number *</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-blue-200 focus:border-blue-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900">Bank Details</h3>
                <FormField
                  control={form.control}
                  name="bankDetails.bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-blue-200 focus:border-blue-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.branchAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch Name & Address *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-blue-200 focus:border-blue-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.ifscCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-blue-200 focus:border-blue-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-blue-200 focus:border-blue-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankDetails.accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-blue-200 focus:border-blue-400" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}