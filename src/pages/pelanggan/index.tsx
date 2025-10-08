import DashboardLayout from "@/components/layout/DashboardLayout";
import Pelanggan from "@/components/views/Pelanggan/Pelanggan";

export default function PagePelanggan() {
  return (
    <div>
      <DashboardLayout title="Pelanggan">
        <Pelanggan />
      </DashboardLayout>
    </div>
  );
}
