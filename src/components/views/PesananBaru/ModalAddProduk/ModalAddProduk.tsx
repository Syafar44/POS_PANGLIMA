import { convertIDR } from "@/utils/currency";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Switch } from "@heroui/react";
import { FiMinus, FiPercent, FiPlus } from "react-icons/fi";
import useModalAddProduk from "./useModalAddProduk";
import { IProduk } from "@/types/Produk";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    selectedId: string;
    refetchCart: () => void;
}

const ModalAddProduk = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, selectedId, refetchCart } = props;
    const {
        quantity,
        setQuantity,
        isPercent,
        setIsPercent,
        isDiscount,
        setIsDiscount,
        isMessage,
        setIsMessage,
        toggleProp,
        selectedProps,
        getTotalSelectedProps,
        findProductByCode,
        handleAddCart,
        setSelectedProps,
    } = useModalAddProduk();

    const produk = findProductByCode(selectedId);
    const totalProps = getTotalSelectedProps();
    const maxProduk = (produk as IProduk)?.maxProduk;

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="top"
            scrollBehavior="inside"
            onClose={() => {
                onClose()
                setIsDiscount(0)
                setIsMessage("")
                setQuantity(1)
                setSelectedProps([]);
            }}
            radius="md"
            hideCloseButton
            size="3xl"
            className="z-50"
        >
            <ModalContent className="m-4">
                <ModalHeader className="border-b border-secondary/20">
                    <div className="flex justify-between w-full">
                        <div className="grid">
                            <h1 className="text-xl">
                                {produk?.title}
                            </h1>
                            <p className="text-sm text-secondary">
                                Kode Barang : {produk?.code_produk}
                            </p>
                        </div>
                        <div className="grid text-end">
                            <p className="text-sm font-normal">
                                Subtotal
                            </p>
                            <h1 className="text-xl text-primary">
                                {convertIDR(Number(produk?.price) * quantity)}
                            </h1>
                        </div>
                    </div>
                    <Button 
                        className="ml-5 bg-primary text-white font-bold" 
                        size="lg" 
                        radius="sm"
                        onPress={() => handleAddCart(produk as IProduk, onClose, refetchCart)}
                    >
                        Simpan  
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <div className="flex gap-5 py-5 border-b border-secondary/30">
                        <div className="bg-gradient-to-br from-primary/20 to-primary w-[200px] rounded-md flex justify-center items-center">
                            <h1 className="text-5xl font-bold text-center">GA</h1>
                        </div>
                        <div className="w-full">
                            <h3 className="font-semibold text-2xl">Harga {convertIDR(Number(produk?.price))}</h3>
                            <p>Kuantitas</p>
                            <div className="flex gap-5 mt-5">
                                <Button 
                                    isIconOnly 
                                    radius="full" 
                                    className="border bg-transparent border-secondary"
                                    onPress={() => setQuantity(quantity - 1)}
                                    isDisabled={quantity === 1}
                                >
                                    <FiMinus />
                                </Button>
                                <span className="w-[100px] border-b flex justify-center text-xl">
                                    {quantity}
                                </span>
                                <Button 
                                    isIconOnly 
                                    radius="full" 
                                    className="bg-primary"
                                    onPress={() => setQuantity(quantity + 1)}
                                >
                                    <FiPlus />
                                </Button>
                                <span className="border-2 border-primary flex justify-center items-center px-5 rounded">
                                    <p>PCS</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    {produk?.props?.length !== undefined && (
                        <div className="border-b border-secondary/30 pt-3 pb-6">
                            <div className="flex justify-between mb-3">
                                <p className="">
                                    Pilih Varian ( {totalProps} / {maxProduk || 0} )
                                </p>
                                <Button 
                                    className="h-full bg-transparent text-red-500" 
                                    radius="sm"
                                    onPress={() => setSelectedProps([])}
                                    isDisabled={totalProps === 0}
                                >
                                    Reset
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {produk.props.map((prop: IProduk) => {
                                    const selected = selectedProps.find((p) => p.code_produk === prop.code_produk);
                                    return (
                                        <Button
                                            key={prop.code_produk}
                                            size="sm"
                                            radius="full"
                                            className={`border ${
                                                selected ? "bg-primary text-white" : "bg-transparent border-primary"
                                            }`}
                                            onPress={() => toggleProp(prop, maxProduk)}
                                            isDisabled={
                                                Boolean(!selected &&
                                                maxProduk &&
                                                totalProps >= maxProduk)
                                            }
                                        >
                                            {prop.title}
                                            {selected && selected.quantity > 0 && (
                                                <span className="ml-2 text-xs font-bold">
                                                    {selected.quantity}
                                                </span>
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="grid gap-5 py-5">
                        <Input
                            label="Berikan Diskon"
                            labelPlacement="outside"
                            placeholder="Masukkan diskon" 
                            type="text"
                            inputMode="numeric"
                            size="lg"
                            variant="bordered"
                            radius="sm"
                            className="w-full"
                            value={isDiscount ? (isPercent ? `${isDiscount}%` : convertIDR(isDiscount)) : ""}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "");
                                setIsDiscount(Number(raw) || 0);
                            }}
                            endContent={
                                <Switch
                                    defaultSelected
                                    color="secondary"
                                    className="shadow-md rounded-full"
                                    size="lg"
                                    isSelected={isPercent} onValueChange={setIsPercent}
                                    thumbIcon={({isSelected, className}) =>
                                        isSelected ? <FiPercent className={className} /> : <p className="text-xs bg-secondary rounded-full text-white p-[4px]">Rp</p>
                                    }
                                    >
                                </Switch>
                            }
                        />
                        <Input 
                            label="Catatan"
                            labelPlacement="outside"
                            placeholder="Masukkan Catatan disini ( Opsional )" 
                            size="lg"
                            type="text"
                            className="w-full"
                            variant="bordered"
                            radius="sm"
                            value={isMessage} onValueChange={setIsMessage}
                        />
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalAddProduk;