import { Dispatch, SetStateAction } from "react";
import { Boxes, Images, Package, Users } from "lucide-react";
import { Button } from "@mui/material";
import { AdminSideBarOptions } from "@/lib/types";
const Sidebar = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: AdminSideBarOptions;
  setActiveSection: Dispatch<SetStateAction<AdminSideBarOptions>>;
}) => {
  return (
    <aside className="w-64 bg-muted p-6 flex flex-col gap-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Админ</h2>
      <Button
        sx={{ justifyContent: "flex-start" }}
        color={
          activeSection === AdminSideBarOptions.products ? "primary" : "inherit"
        }
        onClick={() => setActiveSection(AdminSideBarOptions.products)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <Boxes size={20} /> <div>Бүтээгдэхүүн</div>
      </Button>
      <Button
        sx={{ justifyContent: "flex-start" }}
        color={
          activeSection === AdminSideBarOptions.images ? "primary" : "inherit"
        }
        onClick={() => setActiveSection(AdminSideBarOptions.images)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <Images size={20} /> <div>Медиа</div>
      </Button>
      <Button
        sx={{ justifyContent: "flex-start" }}
        color={
          activeSection === AdminSideBarOptions.orders ? "primary" : "inherit"
        }
        onClick={() => setActiveSection(AdminSideBarOptions.orders)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <Package size={20} /> <div>Захиалгууд</div>
      </Button>
      <Button
        sx={{ justifyContent: "flex-start" }}
        color={
          activeSection === AdminSideBarOptions.users ? "primary" : "inherit"
        }
        onClick={() => setActiveSection(AdminSideBarOptions.users)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <Users size={20} /> <div>Хэрэглэгчид</div>
      </Button>
    </aside>
  );
};

export default Sidebar;
