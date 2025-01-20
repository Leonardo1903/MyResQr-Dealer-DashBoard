import { useToast } from "../hooks/use-toast";
import RegistrationForm from "../components/RegistrationForm";


export default function Registration() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { toast } = useToast();

  const handleSubmit = (values) => {
    toast({
      title: "Form Submitted",
      description: "Form submitted successfully",
      variantL: "default",
    });
    console.log(values);
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
}
