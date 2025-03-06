"use client";
import React, { useState } from "react";
import { useLayout } from "./pdfLayoutContext";
import { Building, Home, Phone, Quote } from "lucide-react";

const PreviewPDF: React.FunctionComponent = ({}) => {
  const { layout, data } = useLayout();
  const { name, username, email, website, phone, company, address } = data || {};

  const renderLayout = () => {
    switch (layout) {
      case "layout1":
        return (
          <div id="layout1">
            <div className="flex items-center">
              <p className="text-xl font-bold border">{name}</p>
              <div className="border-r border-solid  border-neutral-800 w-1 mr-1 h-4 "></div>
              <p className="text-[10px] text-neutral-700">@{username}</p>
            </div>
            <p className="text-xs">
              {email} | {website}
            </p>
            <section className="text-xs md:my-3 flex gap-1 items-start">
              <div>
                <Home size={18} />
              </div>
              <div>
                <p className="text-sm font-bold">{address?.street}</p>
                <p className="italic">{address?.suite}</p>
                <p>
                  {address?.city} - {address?.zipcode}
                </p>
              </div>
            </section>
            <section className="text-xs md:my-3 flex gap-1 items-start">
              <div>
                <Building size={16} />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {company?.name}
                </p>
                <p className="font-[12px]">
                  {company?.catchPhrase}
                </p>
                <p className="italic">{company?.bs}</p>
              </div>
            </section>

            <p className="text-xs flex items-center gap-1">
              <Phone size={16} />
              {phone}
            </p>
          </div>
        );
      case "layout2":
        return (
          <div id="layout2">
            <p className="text-xl font-bold border">{name}</p>
            <p className="text-xs">
              @{username} | {email} | {website}
            </p>
            <section className="text-xs md:my-3 flex gap-1 items-start">
              <div>
                <Home size={16} />
              </div>
              <div>
                <p>
                  {address?.street} | {address?.suite}
                </p>
                <p>
                  {address?.city} - {address?.zipcode}
                </p>
              </div>
            </section>
            <section className="text-xs flex gap-1 items-start md:my-3 my-2">
              <div>
                <Building size={16} />
              </div>
              <div>
                <div>
                  <p>{company?.name}</p>
                  <p>{company?.catchPhrase}</p>
                </div>
                <p className="italic">{company?.bs}</p>
              </div>
            </section>
            <p className="text-xs flex items-center gap-1">
              <Phone size={16} />
              {phone}
            </p>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <section id="previrw-pdf">
      <p>{renderLayout()}</p>
    </section>
  );
};

export default PreviewPDF;
