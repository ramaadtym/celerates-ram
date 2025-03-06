"use client"; // Context harus client component

import { User } from "@/types/User";
import { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  layout: string;
  setLayout: (layout: string) => void;
  data: User | null;
  setData: (user: User) => void;
}

const PdfLayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
  initialData: User;
}

export function LayoutProvider({ children, initialData }: LayoutProviderProps) {
  const [layout, setLayout] = useState<string>("layout1");
  const [data, setData] = useState<User | null>(initialData);

  return (
    <PdfLayoutContext.Provider
      value={{ layout, setLayout, data, setData }}
    >
      {children}
    </PdfLayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(PdfLayoutContext);
  if (!context) {
    throw new Error("useLayout must be used in LayoutProvider");
  }
  return context;
}
