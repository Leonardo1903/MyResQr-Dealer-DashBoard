import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import Registration from "./pages/Registration";
import Layout from "./Layout";

import LoginPage from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import DealerKYC from "./pages/DealerKYC";
import { RecoilRoot } from "recoil";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="" element={<LoginPage />} />
        <Route path="/new-user" element={<RegistrationForm />} />
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
        {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
        <RouterProvider router={router} />
        <Toaster />
        {/* </ThemeProvider> */}
      </RecoilRoot>
    </div>
  );
}

export default App;
