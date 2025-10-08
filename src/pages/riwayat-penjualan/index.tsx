import DashboardLayout from "@/components/layout/DashboardLayout";
import RiwayatPenjualan from "@/components/views/RiwayatPenjualan/RiwayatPenjualan";

export default function PageRiwayatPenjualan() {
  return (
    <div>
      <DashboardLayout title="Riwayat Penjualan">
        <RiwayatPenjualan />
      </DashboardLayout>
    </div>
  );
}
