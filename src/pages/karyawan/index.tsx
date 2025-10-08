import DashboardLayout from "@/components/layout/DashboardLayout";
import Karyawan from "@/components/views/Karyawan/Karyawan";

export default function PageKaryawan() {
  return (
    <div>
      <DashboardLayout title="Karyawan">
        <Karyawan />
      </DashboardLayout>
    </div>
  );
}
