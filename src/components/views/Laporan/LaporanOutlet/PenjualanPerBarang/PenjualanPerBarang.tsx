import { convertIDR } from "@/utils/currency";
import { convertDate } from "@/utils/date";
import { Button, Select, SelectItem } from "@heroui/react";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const PenerimaanPenjualan = () => {
    const today = new Date();
    const tanggalHariIni = today.getDate();
    
    function getTheMonts() {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < tanggalHariIni; i++) {
            const d = new Date(today);
            console.log(convertDate(`${d}`))
            d.setDate(today.getDate() - i);
            dates.push(convertDate(`${d}`));
        }
        return dates;
    }
    
    const monts = getTheMonts();

    return (
        <div>
            <Select
                isRequired
                className="w-full text-xl"
                defaultSelectedKeys={[monts[0]]}
                variant="bordered"
                label="Pilih Tanggal Laporan"
                startContent={<FiCalendar size={24} className="mr-3" />}
            >
                {monts.map((date) => (
                    <SelectItem className="py-3" key={date}>{date}</SelectItem>
                ))}
            </Select>
            <div className="flex flex-col justify-between items-center py-5 gap-5">
                <div className="flex justify-between w-full gap-5">
                    <div className="flex flex-col justify-center items-center w-full bg-secondary/5 border border-secondary/20 p-5 rounded">
                        <p className="text-secondary">
                            Total barang terjual
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {120}
                        </h3>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full bg-secondary/5 border border-secondary/20 p-5 rounded">
                        <p className="text-secondary">
                            Total Transaksi
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {20}
                        </h3>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full bg-secondary/5 border border-secondary/20 p-5 rounded">
                        <p className="text-secondary">
                            Jumlah Penjualan
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {convertIDR(Number(1220000))}
                        </h3>
                    </div>
                </div>
                <div className="w-full grid gap-5">
                    <Button
                        className="w-full flex justify-between p-5 text-start h-[80px] shadow-md"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                    >
                        <div className="flex gap-5">
                            <div className="bg-gradient-to-br from-green-400/20 to-green-400 text-3xl font-bold flex justify-center items-center px-5 rounded-sm">
                                GC
                            </div>
                            <span>
                                <h5 className="text-xl">
                                    Gembung Coklat
                                </h5>
                                <p>27 PCS</p>
                            </span>
                        </div>
                        <span className="flex items-center gap-5">
                            <h6 className="text-xl">
                                {convertIDR(800000)}
                            </h6>
                        </span>
                    </Button>
                    <Button
                        className="w-full flex justify-between p-5 text-start h-[80px] shadow-md"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                    >
                        <div className="flex gap-5">
                            <div className="bg-gradient-to-br from-red-300/20 to-red-300 text-3xl font-bold flex justify-center items-center px-5 rounded-sm">
                                KR
                            </div>
                            <span>
                                <h5 className="text-xl">
                                    Kotak Roti Gembung isi 1
                                </h5>
                                <p>20 Lembar</p>
                            </span>
                        </div>
                        <span className="flex items-center gap-5">
                            <h6 className="text-xl">
                                {convertIDR(0)}
                            </h6>
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PenerimaanPenjualan;
