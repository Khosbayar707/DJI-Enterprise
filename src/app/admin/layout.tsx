import { ReactNode } from "react";
import AdminHeader from "./_components/header";
import SideBarContextProvider from "./_components/context/sideBar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SideBarContextProvider>
        <AdminHeader />
        {children}
      </SideBarContextProvider>
    </div>
  );
};

export default AdminLayout;
