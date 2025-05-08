"use client";
import { FiAlignJustify } from "react-icons/fi";
import { useSideBarContextHook } from "./context/sideBar";

const AdminHeader = () => {
  const { open, setOpen } = useSideBarContextHook();
  return (
    <div className=" shadow-2xl h-8 flex items-center justify-between px-6 w-full">
      <FiAlignJustify
        onClick={() => setOpen((p) => !p)}
        className="text-xl cursor-pointer"
      />
      <div>Админы хэсэг</div>
    </div>
  );
};
export default AdminHeader;
