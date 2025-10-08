import DashboardLayout from "@/components/layout/DashboardLayout";
import OpenBill from "@/components/views/OpenBill/OpenBill";

export default function PageOpenBill() {
  return (
    <div>
      <DashboardLayout title="Open Bill">
        <OpenBill />
      </DashboardLayout>
    </div>
  );
}
