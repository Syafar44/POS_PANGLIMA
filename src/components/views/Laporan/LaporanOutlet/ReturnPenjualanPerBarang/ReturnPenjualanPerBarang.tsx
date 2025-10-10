import { convertIDR } from "@/utils/currency";
import { convertDate } from "@/utils/date";
import { Button, Select, SelectItem } from "@heroui/react";
import { FiAlertTriangle, FiCalendar} from "react-icons/fi";

const ReturnPenjualanPerBarang = () => {
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
                            Total barang retur
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {0}
                        </h3>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full bg-secondary/5 border border-secondary/20 p-5 rounded">
                        <p className="text-secondary">
                            Transaksi retur
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {0}
                        </h3>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full bg-secondary/5 border border-secondary/20 p-5 rounded">
                        <p className="text-secondary">
                            Uang dikembalikan
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {convertIDR(Number(0))}
                        </h3>
                    </div>
                </div>
                <div className="w-full grid gap-5">
                    <div className="flex justify-center items-center flex-col h-[300px]">
                        <FiAlertTriangle size={50} />
                        <p className="text-secondary text-lg font-bold">Tidak ada data</p>
                        <p className="text-secondary font-normal">Belum ada transaksi retur.</p>
                        <p className="text-secondary font-normal">Silahkan Coba ubah filter tanggal.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnPenjualanPerBarang;
