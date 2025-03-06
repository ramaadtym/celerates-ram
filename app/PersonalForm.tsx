"use client";
import { Form } from "@/components/ui/form";
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
import { Download } from "lucide-react";

interface IPersonalFormProps {
  data: User;
}

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  username: z.string(),
  email: z.string(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(25, "Phone number must be at most 25 digits")
    .regex(/^[0-9x-]+(?: [0-9x-]+)*$/, "Invalid phone number format"),
  address: z.object({
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
  }),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
  layout: z.string(),
});

const PersonalForm: React.FunctionComponent<IPersonalFormProps> = ({
  data,
}) => {
  const { name, phone, email, address, company, website } = data || {};
  const { setLayout, setData } = useLayout();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
      layout: "layout1",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        username: data.username,
        email: data.email || "",
        phone: data.phone || "",
        address: {
          street: data?.address?.street || "",
          suite: data?.address?.suite || "",
          city: data?.address?.city || "",
          zipcode: data?.address?.zipcode || "",
        },
        website: data.website || "",
        company: {
          name: data?.company?.name || "",
          catchPhrase: data?.company?.catchPhrase || "",
          bs: data?.company?.bs || "",
        },
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
            value={form.watch("email")}
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
                  value={form.watch("address.street")}
                  onChange={handleChange("address.street")}
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
                  value={form.watch("address.city")}
                  onChange={handleChange("address.city")}
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
                  value={form.watch("address.suite")}
                  onChange={handleChange("address.suite")}
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
                  value={form.watch("address.zipcode")}
                  onChange={handleChange("address.zipcode")}
                />
              </div>
            </div>
          </div>
          <section>
            <div className="mb-4">
              <div className="my-4">
                <InputField
                  control={form.control}
                  name="company"
                  label="Company"
                  placeholder="Company"
                  type="text"
                  isRequired
                  value={form.watch("company.name")}
                  onChange={handleChange("company.name")}
                />
              </div>
              <div className="my-4">
                <InputField
                  control={form.control}
                  name="company"
                  label="Catch Phrase"
                  placeholder="CatchPhrase"
                  type="text"
                  isRequired
                  value={form.watch("company.catchPhrase")}
                  onChange={handleChange("company.catchPhrase")}
                />
              </div>
              <div className="my-4">
                <InputField
                  control={form.control}
                  name="company"
                  label="BS"
                  placeholder="BS"
                  type="text"
                  isRequired
                  value={form.watch("company.bs")}
                  onChange={handleChange("company.bs")}
                />
              </div>
            </div>
            <div>
              <InputField
                control={form.control}
                name="website"
                label="Website"
                placeholder="Website"
                type="text"
                value={form.watch("website")}
                onChange={handleChange("website")}
              />
            </div>
          </section>
          <div className="flex gap-2">
            <Button type="submit">Preview</Button>
            <Button
              onClick={() => {
                window.print();
              }}
            >
              <Download size={16} /> Download
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PersonalForm;
