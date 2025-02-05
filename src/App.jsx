import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import Layout from "./Layout";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import DealerKYC from "./pages/DealerKYC";
import DealerInfo from "./pages/DealerInfo";
import { RecoilRoot } from "recoil";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="" element={<LoginPage />} />
        <Route path="/new-user" element={<RegistrationForm />} />
        <Route path="/contact" element={<DealerInfo />} />
        <Route path="/dealer-regn" element={<DealerKYC />} />
        <Route path="/" element={<Layout />}>
          <Route path="/view-policy" element={<Dashboard />} />
          <Route path="/dashboard" element={<Home />} />
        </Route>
      </>
    )
  );

  return (
    <div className="max-w-screen">
      <RecoilRoot>
        <RouterProvider router={router} />
        <Toaster />
      </RecoilRoot>
    </div>
  );
}

export default App;
