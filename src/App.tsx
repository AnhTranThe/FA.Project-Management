import { BrowserRouter } from "react-router-dom";

import Router from "../src/router/Router";
import { LayoutProvider } from "./pages/context/layoutcontext";
import { ToastProvider } from "./pages/context/toastContext";
export default function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </LayoutProvider>
      <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
    </BrowserRouter>
  );
}
