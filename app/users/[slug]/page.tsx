import React from "react";
import PersonalForm from "../../PersonalForm";
import { User } from "@/types/User";
import { fetchUsers } from "@/api/userApi";
import { notFound } from "next/navigation";

interface IEditPageProps {
  params: { slug: string };
}

const EditPage: React.FunctionComponent<IEditPageProps> = async ({params}) => {
  const users: User[] = await fetchUsers();
  const user = users.find((item) => item.name.toLowerCase().replace(/\s+/g, "-") === params.slug)
   
  if (!user) {
     notFound();
   }

  return (
    <section className="flex h-screen w-full">
      <div className="w-1/2 p-6">
        <PersonalForm data={user}/>
      </div>
      <div className="bg-neutral-200 w-1/2 p-6">Preview</div>
    </section>
  );
};

export default EditPage;
