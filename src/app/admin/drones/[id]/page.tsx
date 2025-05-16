"use client";
import { DroneSideBarOptions, SpecSideBarOptions } from "@/lib/types";
import { useState } from "react";
import { DroneSectionComponents } from "./_components/sections/sections";
import DroneSidebar from "./_components/DroneSidebar";

const AdminDronePage = () => {
  const [activeSection, setActiveSection] = useState<DroneSideBarOptions>(
    DroneSideBarOptions.GENERAL
  );
  return (
    <div className="flex h-screen">
      <DroneSidebar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {DroneSectionComponents[activeSection]}
      </main>
    </div>
  );
};

export default AdminDronePage;
