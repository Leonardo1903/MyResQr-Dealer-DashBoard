import { useToast } from "../hooks/use-toast";
import DealerForm from "../components/DealerForm";
import axios from "axios";

export default function DealerKYC() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { toast } = useToast();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${baseUrl}/dealer/submit-request/`,
        values
      );
      toast({
        title: "Form Submitted",
        description: "Form submitted successfully",
        variant: "default",
      });
      console.log(response.data);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the form",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return <DealerForm onSubmit={handleSubmit} />;
}
