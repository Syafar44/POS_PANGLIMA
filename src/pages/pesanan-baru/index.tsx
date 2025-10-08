import DashboardLayout from "@/components/layout/DashboardLayout";
import PesananBaru from "@/components/views/PesananBaru/PesananBaru";

export default function PagePesananBaru() {
  return (
    <div>
      <DashboardLayout title="Pesanan Baru">
        <PesananBaru />
      </DashboardLayout>
    </div>
  );
}
