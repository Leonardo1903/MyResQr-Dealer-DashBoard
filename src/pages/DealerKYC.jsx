import { useToast } from "../hooks/use-toast";
import DealerForm from "../components/DealerForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DealerKYC() {
  const baseUrl = "http://3.108.8.215/api/v1";
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
  
    try {
      const response = await axios.post(
        `${baseUrl}/dealer/submit-request/`,
        values
      );
      toast({
        title: "Form Submitted",
        description: response.data.message,
        variant: "default",
      });
      navigate("/dashboard");
      console.log(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.response?.data?.detail || error.message;
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Submission Error:", errorMessage);
    }
  };

  return <DealerForm onSubmit={handleSubmit} />;
}
