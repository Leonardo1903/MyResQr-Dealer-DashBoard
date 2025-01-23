import LoginForm from "../components/LoginForm";
import { toast } from "../hooks/use-toast";
import axios from "axios";
import { accessTokenAtom, Dealer_nameAtom } from "../store/UserAtoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const baseUrl = "http://3.108.8.215/api/v1";

  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const setDealerName = useSetRecoilState(Dealer_nameAtom);
  const navigate = useNavigate();

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const response = await axios.post(`${baseUrl}/dealer/login/`, {
        email,
        password,
      });
      // console.log(response.data);
      // setAccessToken(response.data.accessToken);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      setDealerName(response.data.Dealer_name);
      toast({
        title: "Login Successful",
        description: "You have logged in successfully",
        variant: "default",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: "Login failed. Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
}
