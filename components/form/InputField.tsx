import * as React from 'react';
import { useForm, UseFormReturn, Control } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormValues {
  name: string;
  phone: string;
  street: string;
  suite: string;
  city: string;
  zip: string;
  website: string;
  company: string;
}

interface IInputFieldProps {
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type?: string;
  isRequired?: boolean
}

const InputField: React.FunctionComponent<IInputFieldProps> = ({control, name, label, placeholder, type = "text", isRequired}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{isRequired && "*"}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={(e) =>
                field.onChange(
                  type === "number"
                    ? Number(e.target.value) || ""
                    : e.target.value
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
