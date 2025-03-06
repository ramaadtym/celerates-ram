"use client";
import {
  Form
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/form/InputField";
import { User } from "@/types/User";
import { fetchUsers } from "@/api/userApi";
import ComboBox from "@/components/ui/combobox";
import { useLayout } from "./users/[slug]/pdfLayoutContext";

interface IPersonalFormProps {
  data: User;
}

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(25, "Phone number must be at most 25 digits"),
  street: z.string().min(10, {
    message: "Address must be at least 10 characters",
  }),
  suite: z.string().min(4, {
    message: "Suite must be at least 4 characters.",
  }),
  city: z.string(),
  zipcode: z
    .string()
    .min(5, "Zip Code must be at least 5 digits")
    .max(15, "Zip Code must be at most 15 digits"),
  website: z.string(),
  company: z.string(),
  layout: z.string(),
});

const PersonalForm: React.FunctionComponent<IPersonalFormProps> = ({
  data
}) => {
  const { name, phone, email, address, company, website } = data || {};
  const { setLayout, setData } = useLayout();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      website: "",
      company: "",
      layout: "layout1",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        street: data.address?.street || "",
        suite: data.address?.suite || "",
        city: data.address?.city || "",
        zipcode: data.address?.zipcode || "",
        website: data.website || "",
        company: data.company?.name || "",
      });
    }
  }, [data, form]);

  const handleChange =
    (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setValue(field, e.target.value);
    };

  const handleSelect = (value: string) => {
    form.setValue("layout", value);
    setLayout(value);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setData(values);
  }

  return (
    <>
      <h1 className="text-center text-xl">Personal Data of {name}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ComboBox
            value={form.watch("layout")}
            control={form.control}
            onSelect={handleSelect}
          />
          <InputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            isRequired
            value={form.watch("name")}
            onChange={handleChange("name")}
          />
          <InputField
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="Phone No."
            type="text"
            isRequired
            value={form.watch("phone")}
            onChange={handleChange("phone")}
          />
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email Address"
            type="text"
            isRequired
            value={email || ""}
            onChange={handleChange("email")}
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
                  value={address.street || ""}
                  onChange={handleChange("street")}
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
                  value={address.city || ""}
                  onChange={handleChange("city")}
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
                  value={address.suite || ""}
                  onChange={handleChange("suite")}
                />
              </div>
              <div>
                <InputField
                  control={form.control}
                  name="zipcode"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  type="text"
                  isRequired
                  value={form.watch("zipcode")}
                  onChange={handleChange("zipcode")}
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
                value={company.name || ""}
                onChange={handleChange("company")}
              />
            </div>
            <div>
              <InputField
                control={form.control}
                name="website"
                label="Website"
                placeholder="Website"
                type="text"
                value={website || ""}
                onChange={handleChange("website")}
              />
            </div>
          </section>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default PersonalForm;
