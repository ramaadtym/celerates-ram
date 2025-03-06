"use client"; // Context harus client component

import { User } from "@/types/User";
import { createContext, useContext, useState, ReactNode } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(4),
  username: z.string(),
  email: z.string(),
  phone: z.string().min(10).max(25),
  address: z.object({
    street: z.string().min(10),
    suite: z.string().min(4),
    city: z.string(),
    zipcode: z.string().min(5).max(15),
  }),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string()
  }),
  layout: z.string(),
});

export type FormData = z.infer<typeof formSchema>;

interface LayoutContextType {
  layout: string;
  setLayout: (layout: string) => void;
  data: FormData | null;
  setData: (data: FormData) => void;
}

const PdfLayoutContext = createContext<LayoutContextType | undefined>(
  undefined
);

interface LayoutProviderProps {
  children: ReactNode;
  initialData: FormData;
}

export function LayoutProvider({ children, initialData }: LayoutProviderProps) {
  const [layout, setLayout] = useState<string>(
    initialData?.layout || "layout1"
  );
  const [data, setData] = useState<FormData | null>(initialData);

  return (
    <PdfLayoutContext.Provider value={{ layout, setLayout, data, setData }}>
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
