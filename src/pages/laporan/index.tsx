import DashboardLayout from "@/components/layout/DashboardLayout";
import Laporan from "@/components/views/Laporan/Laporan";

export default function PageLaporan() {
  return (
    <div>
      <DashboardLayout title="Laporan">
        <Laporan />
      </DashboardLayout>
    </div>
  );
}
