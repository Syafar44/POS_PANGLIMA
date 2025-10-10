import { convertIDR } from "@/utils/currency";
import { convertDate } from "@/utils/date";
import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import Modal from "./Modal";
import { useState } from "react";

const PenjualanPerTipePenjualan = () => {
    const today = new Date();
    const tanggalHariIni = today.getDate();
    
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    
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

    const [selectedDate, setSelectedDate] = useState(monts[0]);
    const [payment, setPayment] = useState("")

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
                            Total Penjualan
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {convertIDR(Number(2000000))}
                        </h3>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full bg-secondary/5 border border-secondary/20 p-5 rounded">
                        <p className="text-secondary">
                            Jumlah Transaksi
                        </p>
                        <h3 className="font-semibold text-2xl">
                            {40}
                        </h3>
                    </div>
                </div>
                <div className="w-full grid gap-5">
                    <Button
                        className="w-full flex justify-between p-5 text-start h-[80px] shadow-md"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        onPress={() => {setPayment("takeaway"); onOpen()}}
                    >
                        <span>
                            <h5 className="text-xl">
                                Takeaway
                            </h5>
                            <p>27 Penerimaan</p>
                        </span>
                        <span className="flex items-center gap-5">
                            <h6 className="text-xl">
                                {convertIDR(800000)}
                            </h6>
                            <FiChevronRight />
                        </span>
                    </Button>
                    <Button 
                        className="w-full flex justify-between p-5 text-start h-[80px] shadow-md"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        onPress={() => {setPayment("delivery"); onOpen()}}
                    >
                        <span>
                            <h5 className="text-xl">
                                Delivery
                            </h5>
                            <p>27 Penerimaan</p>
                        </span>
                        <span className="flex items-center gap-5">
                            <h6 className="text-xl">
                                {convertIDR(800000)}
                            </h6>
                            <FiChevronRight />
                        </span>
                    </Button>
                </div>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    payment={payment}
                />
            </div>
        </div>
    );
};

export default PenjualanPerTipePenjualan;
