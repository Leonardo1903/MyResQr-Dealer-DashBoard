import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import emailjs from "@emailjs/browser";
import { useToast } from "../hooks/use-toast";

const benefits = [
  "Be a Part of a Life-Saving Mission",
  "Monetary Benefits & Recurring Earnings",
  "Unmatched Market Potential",
  "Exclusive Reseller Support",
];

export default function DealerInfo() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the initial email
      const result = await emailjs.send(
        "service_o7ybirs",
        "template_7zw8n58",
        {
          name,
          phone_number: mobile,
          company_name: company,
          city,
          email,
          from_email: email,
        },
        "sHgaWLTrbhkvJbGRy"
      );

      // Send the auto-reply email
      const autoReplyResult = await emailjs.send(
        "service_o7ybirs",
        "template_td7fhcp", // Replace with your auto-reply template ID
        {
          dealer_name: name,
          dealer_email: email,
        },
        "sHgaWLTrbhkvJbGRy"
      );

      toast({
        title: "Message sent successfully!",
        description:
          "We will get back to you soon. An auto-reply has been sent to your email.",
        variant: "default",
      });
      setName("");
      setMobile("");
      setCompany("");
      setCity("");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {!showForm ? (
        <Card className="bg-white/10 backdrop-blur-md border-black/20 shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black text-center">
              Become a Reseller – Partner with myresQR.life & Save Lives While
              You Earn!
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto">
            <p className="text-black">
              Join India’s 1st & ONLY End-to-End Emergency Solutions Platform At
              myresQR.life, we are revolutionizing emergency response, making
              sure no accident victim goes unidentified or untreated. By
              becoming a reseller, you don’t just build a profitable
              business—you become a lifeline for people in their most critical
              moments.
            </p>
            <h3 className="text-xl font-bold text-black mt-4">
              Why Partner with myresQR.life?
            </h3>
            <ul className="list-disc list-inside text-black">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <p className="text-black mt-4">
              ✅ Be a Part of a Life-Saving Mission
              <br />• Every time myresQR.life helps a victim, you play a role in
              saving a life and bringing relief to their loved ones.
              <br />• Experience the unmatched satisfaction of making a real
              impact while building your business.
              <br />✅ Monetary Benefits & Recurring Earnings
              <br />• Attractive Commissions: Earn on every new subscription you
              sell.
              <br />• Recurring Incentives: Enjoy lifetime renewal benefits
              whenever your customers renew their services.
              <br />• Zero Investment, High Returns: No upfront costs—just an
              opportunity to earn while promoting safety.
              <br />✅ Unmatched Market Potential
              <br />• Road safety awareness is at an all-time high—myresQR.life
              is a necessity, not just an option.
              <br />• With over 25,000+ ambulances, 600+ cities covered, and
              10,000+ hospitals partnered, myresQR.life is already transforming
              emergency response in India.
              <br />• Every vehicle owner, senior citizen, traveler, and working
              professional is a potential customer!
              <br />✅ Exclusive Reseller Support
              <br />• Training & Marketing Assistance: We provide all the tools
              you need to sell effectively.
              <br />• Dedicated Support Team: Our team is always available to
              assist you in growing your business.
              <br />• Co-Branding Opportunities: Offer myresQR.life under your
              brand name for a stronger market presence.
              <br />
              Make a Difference & Earn Blessings
              <br />
              By selling myresQR.life, you’re not just making money—you’re
              earning the gratitude and blessings of families who might have
              lost a loved one without our solution. Be the reason someone gets
              a second chance at life.
              <br />
              Ready to Join the Movement?
              <br />
              Be a part of India’s 1st and only RSA (Roadside Assistance) for
              Human Beings. Sign up as a reseller today and start transforming
              lives—while securing your financial future.
              <br />
              📞 Call us at 9071112112
              <br />
              📧 Email us at reseller@myresqr.life
              <br />
              🔗 Join Now & Start Earning!
            </p>
            <Button
              onClick={handleButtonClick}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white mt-4"
            >
              Reach us to be a reseller
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/10 backdrop-blur-md border-black/20 shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black text-center">
              Reseller Registration Form
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label className="text-black block">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/20 text-black border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black block">Mobile Number</Label>
                <Input
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="w-full bg-white/20 text-black border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black block">Company Name</Label>
                <Input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full bg-white/20 text-black border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black block">City</Label>
                <Input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full bg-white/20 text-black border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black block">Email ID</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/20 text-black border-gray-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}