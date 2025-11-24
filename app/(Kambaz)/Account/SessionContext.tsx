"use client";
import { createContext, useContext } from "react";

interface SessionContextType {
  isLoading: boolean;
}

const defaultValue: SessionContextType = {
  isLoading: true,
};

export const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  // Return default value if context is not available (SSR or outside provider)
  if (!context) {
    return defaultValue;
  }
  return context;
};
