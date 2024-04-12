import React from "react";

export interface IRouteChildModel {
  path: string;
  element: React.ReactNode;
  children?: IRouteChildModel[];
}
export interface IRouteModel {
  path: string;
  element: React.ReactNode;
  children: IRouteChildModel[];
}
