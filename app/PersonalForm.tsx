"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/form/InputField";

interface IPersonalFormProps {}

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  street: z.string().min(10, {
    message: "Address must be at least 10 characters",
  }),
  suite: z.string().min(4, {
    message: "Suite must be at least 4 characters.",
  }),
  city: z.string(),
  zip: z
    .string()
    .min(5, "Zip Code must be at least 5 digits")
    .max(8, "Phone number must be at most 8 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  website: z.string(),
  company: z.string(),
});

const PersonalForm: React.FunctionComponent<IPersonalFormProps> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      suite: "",
      city: "",
      zip: "",
      website: "",
      company: ""
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Name"
          type="text"
          isRequired
        />
        <InputField
          control={form.control}
          name="phone"
          label="Phone"
          placeholder="Phone No."
          type="text"
          isRequired
        />
        <div className="mt-4 mb-0">
          <Label>Address</Label>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <div className="my-4">
              <InputField
                control={form.control}
                name="street"
                label="Street"
                placeholder="Street"
                type="text"
                isRequired
              />
            </div>
            <div>
              <InputField
                control={form.control}
                name="city"
                label="City"
                placeholder="City"
                type="text"
                isRequired
              />
            </div>
          </div>
          <div className="w-1/2 ml-4">
            <div className="my-4">
              <InputField
                control={form.control}
                name="suite"
                label="Suite"
                placeholder="Suite"
                type="text"
                isRequired
              />
            </div>
            <div>
              <InputField
                control={form.control}
                name="zip"
                label="ZIP Code"
                placeholder="ZIP Code"
                type="text"
                isRequired
              />
            </div>
          </div>
        </div>
        <section>
          <div className="mb-4">
            <InputField
              control={form.control}
              name="company"
              label="Company"
              placeholder="Company"
              type="text"
              isRequired
            />
          </div>
          <div>
            <InputField
              control={form.control}
              name="website"
              label="Website"
              placeholder="Website"
              type="text"
            />
          </div>
        </section>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PersonalForm;
