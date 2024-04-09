import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "./layout/context/layoutcontext";
import Router from '../src/router/Router';
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
