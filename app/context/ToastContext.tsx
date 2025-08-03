import ToastNotification from "@/components/ToastNotification";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ToastOptions {
  text: string;
  color?: string;
  icon?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastOptions, setToastOptions] = useState<ToastOptions | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (options: ToastOptions) => {
    setToastOptions(options);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), options.duration ?? 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && toastOptions && (
        <ToastNotification
          text={toastOptions.text}
          color={toastOptions.color}
          icon={toastOptions.icon as any}
          duration={toastOptions.duration}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
