"use client";
import { useState } from "react";
import UserCard from "./_components/user-card";
import ProductCard from "./_components/product-card";
import Sidebar from "./_components/sidebar";
import OrderSection from "./_components/order-card";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<
    "products" | "users" | "orders"
  >("products");

  return (
    <div className="flex h-screen">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-6 overflow-y-auto">
        {activeSection === "products" && <ProductCard />}
        {activeSection === "users" && <UserCard />}
        {activeSection === "orders" && <OrderSection />}
      </main>
    </div>
  );
};

export default AdminPage;
