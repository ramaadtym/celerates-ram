import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import PersonalForm from "./PersonalForm";

interface IHomepage {}

const Homepage: React.FC<IHomepage> = (props) => {
  const asd = "";

  return (
    <section id="home" className="flex h-screen w-full">
      <div className="w-1/2 p-6">
        <PersonalForm/>
      </div>
      <div className="bg-neutral-200 w-1/2 p-6">Preview</div>
    </section>
  );
};

export default Homepage;
