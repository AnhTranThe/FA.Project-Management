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
export interface ITestItemObject {
  spotify: string;
}

export interface ITestItemModel {
  artists: [];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ITestItemObject;
}
export interface ITestModel {
  href: string;
  limit: number;
  next: null | undefined;
  offset: number;
  previous: null | undefined;
  total: number;
  items: ITestItemModel[];
}
