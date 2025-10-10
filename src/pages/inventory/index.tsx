import DashboardLayout from "@/components/layout/DashboardLayout";
import Inventory from "@/components/views/Inventory/Inventory";

export default function PageInventory() {
  return (
    <div>
      <DashboardLayout title="Inventory">
        <Inventory />
      </DashboardLayout>
    </div>
  );
}
