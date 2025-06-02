import GarminProductForm from "./_components/edit-product-form";
import GarminProductTable from "./_components/GarminProductTable";

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <GarminProductTable />
    </div>
  );
}
