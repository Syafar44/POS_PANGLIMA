import { Dummy_Riwayat_Penjualan } from "@/dummy/contants";
import { cn } from "@/utils/cn";
import { convertIDR } from "@/utils/currency";
import { convertDate } from "@/utils/date";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { FiCalendar, FiCreditCard, FiFileText, FiPaperclip, FiPrinter, FiSearch, FiUser, FiUsers } from "react-icons/fi";

const RiwayatPenjualan = () => {

  const router = useRouter();
  const id = router.query.id as string | undefined;

  const handleSelect = (id: string) => {
    router.replace(
      { query: { ...router.query, id } },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!id && Dummy_Riwayat_Penjualan.length > 0) {
      handleSelect(Dummy_Riwayat_Penjualan[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPenjualanById = (id: string | undefined) => {
    if (!id) return undefined;
    return Dummy_Riwayat_Penjualan.find(item => String(item.id) === String(id));
  };

  const detailPenjualan = useMemo(() => getPenjualanById(id), [id]);
  
  return (
      <section className="flex">
        <div className="w-[600px] border-r border-secondary/40">
          <Input
            placeholder="Cari Penjualan..."
            radius="none"
            variant="bordered"
            type="text"
            size="lg"
            startContent={<FiSearch size={24} />}
            onChange={() => {}}
          />
          <div className="h-[calc(100vh-130px)] overflow-y-scroll flex flex-col gap-2">
            {Dummy_Riwayat_Penjualan.map(item => (
              <div key={item.id} onClick={() => handleSelect(String(item.id))} className={cn("p-5 grid gap-5 bg-secondary/5 cursor-pointer", {
                "bg-primary/30": item.id === id ,
              })}>
                <div className="flex justify-between border-b border-secondary/20 pb-5">
                  <div className="flex gap-3 items-center">
                    <FiCreditCard size={44} />  
                    <span>
                      <h3 className="uppercase font-semibold">
                        {item.id}
                      </h3>
                      <p className="text-sm text-secondary">Total {convertIDR(item.invoice.total_revenue)}</p>
                    </span>
                  </div>
                  <p className="text-secondary">{convertDate(item.createdAt)}</p>
                </div>
                <div className="flex justify-between text-sm text-secondary">
                  <span className="flex gap-5">
                    <p className="flex items-center gap-1"><FiCreditCard size={20} /> {item.invoice.payment_method}</p>
                    <p className="flex items-center gap-1"><FiUser size={20} /> {item.cashier.name}</p>
                  </span>
                  <p>{item.method}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-center items-center border-2 border-secondary/20 h-[48px] gap-5 px-5">
            <Button 
              className="flex gap-2 items-center w-full border-primary"
              variant="bordered"
              size="sm"
            >
              <FiPaperclip />
              <p>Share Struk</p>
            </Button>
            <Button
              className="flex gap-2 items-center w-full bg-primary"
              variant="bordered"
              size="sm"
            >
              <FiPrinter />
              <p>Cetak Struk</p>
            </Button>
          </div>
          <div className="flex flex-col gap-5 py-5 px-10 h-[calc(100vh-130px)] overflow-y-scroll">
            <h2 className="text-xl font-bold">Informasi Penjualan</h2>
            <div className="border-b border-secondary/20 grid grid-cols-2 gap-5 pb-5">
              <div className="flex items-center gap-4">
                <FiFileText size={40} className="text-secondary" />
                <span>
                  <p className="text-sm text-secondary">Nomor Penjualan</p>
                  <h4 className="uppercase text-lg">{detailPenjualan?.id}</h4>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FiUsers size={40} className="text-secondary" />
                <span>
                  <p className="text-sm text-secondary">Nama Pelanggan</p>
                  <h4 className="text-lg">
                    {detailPenjualan?.customer
                      ? "-"
                      : detailPenjualan?.customer?.name}
                  </h4>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FiCalendar size={40} className="text-secondary" />
                <span>
                  <p className="text-sm text-secondary">Tanggal Penjualan</p>
                  <h4 className="text-lg">{convertDate(`${detailPenjualan?.createdAt}`)}</h4>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <FiUser size={40} className="text-secondary" />
                <span>
                  <p className="text-sm text-secondary">Dibuat Oleh</p>
                  <h4 className="text-lg">{detailPenjualan?.cashier.name}</h4>
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold">Informasi Penjualan</h2>
            <div className="border-b border-secondary/20 pb-5">
              <div className="bg-secondary/5 border border-secondary/20 p-5 rounded flex justify-between">
                <div className="flex flex-col justify-center items-center w-full">
                  <p className="text-sm text-secondary">
                    Total Penerimaan
                  </p>
                  <h3 className="text-primary text-2xl">
                    {convertIDR(Number(detailPenjualan?.invoice.total_revenue))}
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center border-x border-secondary/20 w-full">
                  <p className="text-sm text-secondary">
                    Total Bayar
                  </p>
                  <h3 className="text-primary text-2xl">
                    {convertIDR(Number(detailPenjualan?.invoice.total_payment))}
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                  <p className="text-sm text-secondary">
                    Kembali
                  </p>
                  <h3 className="text-primary text-2xl">
                    {convertIDR(Number(detailPenjualan?.invoice.return))}
                  </h3>
                </div>
              </div>
              <h2 className="text-xl font-bold pt-5">Riwayat Penerimaan</h2> 
              <div className="flex justify-between pt-5">
                <div className="flex flex-col gap-2">
                  <h3 className="uppercase text-xl">
                    {detailPenjualan?.id}
                  </h3>
                  <p className="text-lg text-secondary">{detailPenjualan?.invoice?.payment_method}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-secondary text-end">{convertDate(`${detailPenjualan?.createdAt}`)}</p>
                  <h3 className="text-2xl text-primary text-end">
                    {convertIDR(Number(detailPenjualan?.invoice?.total_revenue))}
                  </h3>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold">Barang & Jasa</h2>
            <div className="grid gap-5 border-b border-secondary/20 pb-5">
              {detailPenjualan?.commodity.map(item => (
                <div key={item.code_produk} className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="bg-gradient-to-br from-primary/20 to-primary text-5xl w-32 h-24 rounded-lg flex justify-center items-center font-bold">
                      GO
                    </div>
                    <div className="flex flex-col justify-between">
                      <span>
                        <h2 className="font-semibold text-lg">
                          {item.title}
                        </h2>
                        <p className="text-secondary">{item.quantity} {item.unit}</p>
                      </span>
                      <p className="text-secondary">Diinput Oleh : {detailPenjualan?.cashier.name}</p>
                    </div>
                  </div>
                  <span className="font-bold text-xl text-primary flex gap-5">
                    <p className="text-secondary">
                      {item.discount > 0 ? item.is_percent ? `( Diskon ${item.discount}% )` : `( Diskon ${convertIDR(item.discount)} )` : ""}
                    </p>
                    <h3>
                      {convertIDR(Number(item.total_price))} 
                    </h3>
                  </span>
                </div>
              ))}
              <div className="pt-5">
                <div className="flex justify-between items-center">
                  <p className="text-secondary text-xl font-semibold">Subtotal Order</p>
                  <h3 className="font-bold text-xl text-primary">
                    {convertIDR(Number(detailPenjualan?.invoice?.total_revenue))}
                  </h3>
                </div>
              </div>
            </div>
            <div className="pb-5 border-b border-secondary/20">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Subtotal</p>
                <h3 className="font-bold text-xl text-primary">
                  {convertIDR(Number(detailPenjualan?.invoice?.total_revenue))}
                </h3>
              </div>
            </div>
            <div className="pb-5">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">GRAND TOTAL</p>  
                <h3 className="font-bold text-2xl text-primary">
                  {convertIDR(Number(detailPenjualan?.invoice?.total_revenue))}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default RiwayatPenjualan