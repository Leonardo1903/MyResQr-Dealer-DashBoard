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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new-vehicle" element={<Registration />} />
          <Route path="/dealer-kyc" element={<DealerKYC />} />
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
