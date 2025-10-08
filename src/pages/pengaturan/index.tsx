import DashboardLayout from "@/components/layout/DashboardLayout";
import Pengaturan from "@/components/views/Pengaturan/Pengaturan";

export default function PagePengaturan() {
  return (
    <div>
      <DashboardLayout title="Pengaturan">
        <Pengaturan />
      </DashboardLayout>
    </div>
  );
}
