/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

export const ToastContext = React.createContext({} as any);

export interface IToastState {
  severity: "success" | "warn" | "error" | "info" | "";
  summary: string;
  detail: string;
}

export interface IToastValueContext {
  showModelToast: IToastState;
  setShowModelToast: React.Dispatch<React.SetStateAction<IToastState>>;
}

export const ToastProvider = (props: any) => {
  // const [showDetail, setShowDetail] = useState<string>("");
  const [showModelToast, setShowModelToast] = useState<IToastState>({
    severity: "",
    summary: "",
    detail: "",
  });
  const toast = useRef<Toast>(null);

  const showToast = ({ severity, summary, detail }: IToastState) => {
    if (severity !== "") {
      toast.current?.show({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000,
      });
    }
  };
  useEffect(() => {
    const returnShow = showToast({
      severity: showModelToast.severity,
      summary: showModelToast.summary,
      detail: showModelToast.detail,
    });
    return () => returnShow;
  }, [showModelToast]);

  const value: IToastValueContext = {
    showModelToast,
    setShowModelToast,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast ref={toast} position="top-left" />
      {props.children}
    </ToastContext.Provider>
  );
};
