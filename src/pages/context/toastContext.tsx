/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

export const ToastContext = React.createContext({} as any);

export const ToastProvider = (props: any) => {
  const [showDetail, setShowDetail] = useState<string>("");
  const toast = useRef<Toast>(null);

  const showWarning = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: "Email or Name Error",
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "WellCome!!",
      life: 3000,
    });
  };

  useEffect(() => {
    if (showDetail === "success") {
      showSuccess();
      setShowDetail("");
      return;
    } else if (showDetail === "error") {
      showWarning();
      setShowDetail("");
      return;
    }
  }, [showDetail]);

  const value = {
    showDetail,
    setShowDetail,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast ref={toast} position="top-left" />
      {props.children}
    </ToastContext.Provider>
  );
};
