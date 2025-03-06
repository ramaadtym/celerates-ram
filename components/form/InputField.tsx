import * as React from "react";
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
  email: string;
  phone: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  website: string;
  company: string;
}

interface IInputFieldProps {
  control: any;
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type?: string;
  isRequired?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FunctionComponent<IInputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isRequired,
  value,
  onChange,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {isRequired && "*"}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
