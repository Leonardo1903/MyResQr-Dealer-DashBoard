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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          {/* <Route path="" element={<Home />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/new-vehicle" element={<Registration />} />
        </Route>
      </>
    )
  );

  return (
    <div className="max-w-screen">
      {/* <RecoilRoot> */}
      {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
      <RouterProvider router={router} />
      <Toaster />
      {/* </ThemeProvider> */}
      {/* </RecoilRoot> */}
    </div>
  );
}

export default App;
