import React from "react";
import { Outlet } from "react-router-dom";
import HeaderClient from "../components/HeaderClient";

export default function ClientLayout() {
  return (
    <React.Fragment>
      <HeaderClient />

      <Outlet />
    </React.Fragment>
  );
}
