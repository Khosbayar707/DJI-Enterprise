"use client";
import { SpecSideBarOptions } from "@/lib/types";
import { useState } from "react";
import SpecSidebar from "./_components/SpecSidebar";
import { SpecSectionComponents } from "./_components/sections/sections";

const AdminSpecPage = () => {
  const [activeSection, setActiveSection] = useState<SpecSideBarOptions>(
    SpecSideBarOptions.GENERAL
  );
  return (
    <div className="flex h-screen">
      <SpecSidebar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {SpecSectionComponents[activeSection]}
      </main>
    </div>
  );
};

export default AdminSpecPage;
