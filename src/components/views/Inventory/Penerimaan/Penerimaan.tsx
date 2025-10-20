import { Button, getKeyValue, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@heroui/react"
import ModalTerima from "./ModalTerima";
import usePenerimaan from "./usePenerimaan";

const Penerimaan = () => {
    const {onOpen, isOpen, onClose, onOpenChange} = useDisclosure()
    const {
        rows,
        columns,
        selectedKeys, 
        setSelectedKeys,
        enteredBy,
        setEnteredBy,
        selectedId, 
        setSelectedId,
        name,
        selectionState,
        setSelectionState,
        handleSelectionChange,
    } = usePenerimaan()

    return(
        <section className="grid gap-5 px-5">
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <span>
                        <p>
                            No. Po / No. SJ
                        </p>
                        <p>
                            Supplier
                        </p>
                        <p>
                            Ke Gudang
                        </p>
                    </span>
                    <span>
                        <p className="font-semibold">
                            : JPJ1002823 - SJ00234
                        </p>
                        <p>
                            : PPIC - gedung utama
                        </p>
                        <p>
                            : Outlet Juanda 1
                        </p>
                    </span>
                </div>
                <div className="flex gap-5 w-[300px]">
                    <span className="flex flex-col justify-between">
                        <p>
                            Tanggal
                        </p>
                        <p className="text-nowrap mb-3">
                            Diterima Oleh
                        </p>
                    </span>
                    <span className="w-full">
                        <p>
                            : 12 Oct 2025, 13:24
                        </p>
                        <div className="flex items-center">
                            : <Select 
                                variant="underlined" 
                                placeholder="Pilih Penerima" 
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
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    onSelectionChange={handleSelectionChange}
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
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between gap-10">
                <span className="text-danger">
                    <h1 className="font-bold">* Perhatian</h1>
                    <p>Harap perhatikan kembali barang yang diterima sebelum menekan tombol “Terima”.Pastikan jumlah, satuan, dan kualitas barang telah sesuai dengan pesanan serta dalam kondisi baik.</p>
                </span>
                <div className="flex justify-center items-center">
                    <Button 
                        className="w-[200px] h-[70px] text-2xl font-semibold bg-primary" 
                        size="lg"
                        onPress={() => onOpen()}
                    >
                        Terima
                    </Button>
                </div>
            </div>
            <ModalTerima 
                isOpen={isOpen} 
                onClose={onClose} 
                onOpenChange={onOpenChange} 
                accepted={selectionState}
                enteredBy={`${name}`}
                selectedId={selectedId}
                
            />
        </section>
    )
}

export default Penerimaan