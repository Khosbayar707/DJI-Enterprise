import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <div className="min-h-screen">{children}</div>;
};

export default AdminLayout;
