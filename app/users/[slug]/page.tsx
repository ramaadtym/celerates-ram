import React, { useState } from "react";
import PersonalForm from "../../PersonalForm";
import { User } from "@/types/User";
import { fetchUsers } from "@/api/userApi";
import { notFound } from "next/navigation";
import PreviewPDF from "./previewPdf";
import { FormData, LayoutProvider } from "./pdfLayoutContext";

interface IEditPageProps {
  params: { slug: string };
}

const EditPage: React.FunctionComponent<IEditPageProps> = async ({
  params,
}) => {
  const users: User[] = await fetchUsers();
  const user = users.find(
    (item) => item.name.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!user) {
    notFound();
  }

  // convert `user` var from `User` to `FormData`
  const initialData: FormData = {
    name: user.name,
    email: user.email,
    username: user.username,
    phone: user.phone,
    address: {
      street: user.address?.street || "",
      suite: user.address?.suite || "",
      city: user.address?.city || "",
      zipcode: user.address?.zipcode || "",
    },
    website: user.website,
    company: {
      name:user.company?.name || "",
      catchPhrase: user.company?.catchPhrase || "",
      bs: user.company?.bs
    },
    layout: "layout1",
  };

  return (
    <LayoutProvider initialData={initialData}>
      <section className="flex md:flex-row flex-col h-screen w-full">
        <div className="md:w-1/2 w-full p-6">
          <PersonalForm data={user} />
        </div>
        <div className="md:w-1/2 w-full p-6" id="preview-pdf">
          <div className="fixed">
            <PreviewPDF />
          </div>
        </div>
      </section>
    </LayoutProvider>
  );
};

export default EditPage;
