import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Boxes, Package, Users } from "lucide-react";
const Sidebar = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: "products" | "users" | "orders";
  setActiveSection: Dispatch<SetStateAction<"products" | "users" | "orders">>;
}) => {
  return (
    <aside className="w-64 bg-muted p-6 flex flex-col gap-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Админ</h2>
      <Button
        variant={activeSection === "products" ? "default" : "outline"}
        onClick={() => setActiveSection("products")}
        className="justify-start cursor-pointer shadow-2xl"
      >
        <Boxes size={20} /> Бүтээгдэхүүн
      </Button>
      <Button
        variant={activeSection === "orders" ? "default" : "outline"}
        onClick={() => setActiveSection("orders")}
        className="justify-start cursor-pointer shadow-2xl"
      >
        <Package size={20} /> Захиалгууд
      </Button>
      <Button
        variant={activeSection === "users" ? "default" : "outline"}
        onClick={() => setActiveSection("users")}
        className="justify-start cursor-pointer shadow-2xl"
      >
        <Users size={20} /> Хэрэглэгчид
      </Button>
    </aside>
  );
};

export default Sidebar;
