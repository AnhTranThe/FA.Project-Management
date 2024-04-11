import React from "react";

export interface IRouteChildModel {
  path: string;
  element: React.ReactNode;
}
export interface IRouteModel {
  path: string;
  element: React.ReactNode;
  children: IRouteChildModel[];
}
