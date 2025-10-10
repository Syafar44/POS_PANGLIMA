import { Tab, Tabs } from "@heroui/react";
import PenerimaanPenjualan from "./LaporanOutlet/PenerimaanPenjualan";
import PenerimaanPenjualanKaryawan from "./LaporanKaryawan/PenerimaanPenjualan";
import PenjualanPerTipePenjualan from "./LaporanOutlet/PenjualanPerTipePenjualan";
import PenjualanBarangPerPelanggan from "./LaporanOutlet/PenjualanBarangPerPelanggan";
import PenjualanPerBarang from "./LaporanOutlet/PenjualanPerBarang";
import ReturnPenjualanPerBarang from "./LaporanOutlet/ReturnPenjualanPerBarang";
import PenginputanBarang from "./LaporanKaryawan/PenginputanBarang";
import ReturnPenjualan from "./LaporanKaryawan/ReturnPenjualan/ReturnPenjualan";


const Laporan = () => {
  
  return (
      <section className="flex">
        <div className="flex w-full flex-col p-5">
          <Tabs aria-label="Options" size="lg">
            <Tab key="Laporan Outlet" title="Laporan Outlet">
              <Tabs aria-label="Options" size="lg" className="max-w-screen overflow-x-scroll">
                <Tab key="penerimaan-penjualan" title="Penerimaan Penjualan">
                  <PenerimaanPenjualan />
                </Tab>
                <Tab key="penjualan-per-tipe-penjualan" title="Penjualan per Tipe Penjualan">
                  <PenjualanPerTipePenjualan />
                </Tab>
                <Tab key="penjualan-per-pelanggan" title="Penjualan Barang per Pelanggan">
                  <PenjualanBarangPerPelanggan />
                </Tab>
                <Tab key="penjualan-per-barang" title="Penjualan per Barang ">
                  <PenjualanPerBarang />
                </Tab>
                <Tab key="return-return-per-barang" title="Return Penjualan per Barang">
                  <ReturnPenjualanPerBarang />
                </Tab>
              </Tabs>
            </Tab>
            <Tab key="karyawan" title="Laporan Karyawan">
              <Tabs aria-label="Options" size="lg">
                <Tab key="penerimaan-penjualan" title="Penerimaan Penjualan">
                  <PenerimaanPenjualanKaryawan />
                </Tab>
                <Tab key="penginputan-barang" title="Penginputan Barang">
                  <PenginputanBarang />
                </Tab>
                <Tab key="return-penjualan" title="Return Penjualan">
                  <ReturnPenjualan />
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </div>
      </section>
  );
}

export default Laporan