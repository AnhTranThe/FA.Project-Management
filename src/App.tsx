import { BrowserRouter } from "react-router-dom";

import Router from '../src/router/Router';
import { LayoutProvider } from "./pages/context/layoutcontext";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <LayoutProvider>
          <Router />
        </LayoutProvider>
      </BrowserRouter>
    </>
  )
}
