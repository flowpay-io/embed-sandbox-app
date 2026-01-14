import { createContext } from "react";
import type { ToastType, Toast } from "./Toast";

export interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);
