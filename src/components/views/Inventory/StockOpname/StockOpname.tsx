import { Button, Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react"
import { JSX, useCallback, useState } from "react";
import { Selection } from "@react-types/shared";
import ModalSO from "./ModalSO";

const rows = [
    {
        kode_barang: "AJ.003",
        nama_barang: "Adonan Roti Gembung",
        quantity: 75,
        satuan: "PCS",
        Keterangan: ""
    },
    {
        kode_barang: "AJ.004",
        nama_barang: "Bolen Keju jajan",
        quantity: 25,
        satuan: "PCS",
        Keterangan: ""
    },
    {
        kode_barang: "AJ.005",
        nama_barang: "Brownies Bitter",
        quantity: 16,
        satuan: "PCS",
        Keterangan: ""
    },
    {
        kode_barang: "AJ.006",
        nama_barang: "Roti Tawar",
        quantity: 2,
        satuan: "PCS",
        Keterangan: ""
    },
    {
        kode_barang: "AJ.007",
        nama_barang: "Sosis Solo",
        quantity: 12,
        satuan: "PCS",
        Keterangan: ""
    },
];

const columns = [
    {
        key: "kode_barang",
        label: "KODE BARANG",
    },
    {
        key: "nama_barang",
        label: "NAMA BARANG",
    },
    {
        key: "quantity",
        label: "QTY",
    },
    {
        key: "satuan",
        label: "SATUAN",
    },
    // {
    //     key: "keterangan",
    //     label: "KETERANGAN",
    // },
];

const StockOpname = () => {
    const {onOpen, isOpen, onClose, onOpenChange } = useDisclosure()
    const [selectedId, setSelectedId] = useState('JPJ1002823')
    const [enteredBy, setEnteredBy] = useState<Selection>(new Set([]));
    const [quantityChanges, setQuantityChanges] = useState<Record<string, number>>({});

    const name =
        enteredBy === "all"
            ? "Semua"
            : Array.from(enteredBy)[0] || "";

    interface StockRow {
        kode_barang: string;
        nama_barang: string;
        quantity: number;
        satuan: string;
        Keterangan?: string;
        [key: string]: string | number | JSX.Element | undefined;
    }

    type ColumnKey = string;

    const renderCell = useCallback((item: StockRow, columnKey: ColumnKey): JSX.Element | string | number => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "quantity":
                return (
                    <Input
                        type="number"
                        className="max-w-[80px]"
                        defaultValue={""}
                        placeholder="0"
                        onChange={(e: { target: { value: string } }) => {
                            const newValue = Number(e.target.value);
                                setQuantityChanges((prev) => ({
                                ...prev,
                                [item.kode_barang]: newValue,
                            }));
                        }}
                    />
                );
            default:
                return cellValue ?? "";
        }
    }, []);

    return (
        <section className="grid gap-5 px-5">
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <span>
                        <p>
                            No. So
                        </p>
                        <p>
                            Dari Gudang
                        </p>
                        <p>
                            Supplier
                        </p>
                    </span>
                    <span>
                        <p className="font-semibold">
                            : JPJ1002823
                        </p>
                        <p>
                            : Outlet Juanda 1
                        </p>
                        <p>
                            : PPIC - gedung utama
                        </p>
                    </span>
                </div>
                <div className="flex gap-5 w-[300px]">
                    <span className="flex flex-col justify-between">
                        <p>
                            Tanggal
                        </p>
                        <p className="text-nowrap mb-3">
                            DIkirim Oleh
                        </p>
                    </span>
                    <span className="w-full">
                        <p>
                            : 12 Oct 2025, 22:24
                        </p>
                        <div className="flex items-center">
                            : <Select 
                                variant="underlined" 
                                placeholder="Pilih Pengirim" 
                                className="w-full" 
                                size="lg"
                                selectedKeys={enteredBy}
                                onSelectionChange={setEnteredBy}
                            >
                                <SelectItem key="wildan">
                                    Wildan
                                </SelectItem>
                                <SelectItem key="kasir">
                                    Kasir
                                </SelectItem>
                            </Select>
                        </div>
                    </span>
                </div>
            </div>
            <div>
                <Table
                    isHeaderSticky
                    aria-label="Controlled table example with dynamic content"
                    classNames={{
                        base: "max-h-[320px] overflow-scroll border border-secondary/20 rounded-xl",
                    }}
                    >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                        <TableRow key={item.kode_barang}>
                            {(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between gap-10">
                <span className="text-danger">
                    <h1 className="font-bold">* Perhatian</h1>
                    <p>Tinjau kembali SO Anda. Pastikan keakuratan, kelengkapan, dan kesesuaian data sebelum melakukan pengiriman.</p>
                </span>
                <div className="flex justify-center items-center">
                    <Button
                        className="w-[200px] h-[70px] text-2xl font-semibold bg-primary" 
                        size="lg"
                        onPress={onOpen}
                    >
                        Kirim
                    </Button>
                </div>
            </div>
            <ModalSO
                isOpen={isOpen} 
                onClose={onClose} 
                onOpenChange={onOpenChange} 
                accepted={quantityChanges}
                enteredBy={`${name}`}
                selectedId={selectedId}
                
            />
        </section>
    )
}

export default StockOpname