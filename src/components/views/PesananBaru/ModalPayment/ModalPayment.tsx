import { IProdukInCart } from "@/types/Produk";
import { convertIDR } from "@/utils/currency";
import { Button, Chip, Input, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs, tv, useCheckbox, VisuallyHidden} from "@heroui/react";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { PAYMENT_NON_CASH } from "./ModalPayment.constant";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    cart: IProdukInCart[];
    subtotal: number;
    pelanggan?: string;
}

const roundToNearestThousand = (num: number) => Math.ceil(num / 10000) * 10000;

const ModalPayment = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, cart, subtotal, pelanggan ="pelanggan umum" } = props;
    const [selected, setSelected] = useState<"exact" | "rounded" | "custom">("exact");
    const [selectedPayment, setSelectedPayment] = useState("");
    const [selectedMethod, setSelectedMethod] =useState<"takeaway" | "delivery">("takeaway");
    const [customAmount, setCustomAmount] = useState<number | "">("");

    const exactAmount = subtotal;
    const roundedAmount = roundToNearestThousand(subtotal);

    const checkbox = tv({
        slots: {
            base: "border-default hover:bg-default-200 p-5",
            content: "text-lg font-semibold",
        },
        variants: {
            isSelected: {
                true: {
                    base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
                    content: "text-primary-foreground pl-1",
                },
            },
            isFocusVisible: {
                true: {
                    base: "outline-solid outline-transparent ring-2 ring-focus ring-offset-2 ring-offset-background",
                },
            },
        },
    });

    const CustomCheckbox = ({
        label,
        isSelected,
        onSelect,
    }: {
        label: string;
        isSelected: boolean;
        onSelect: () => void;
    }) => {
        const { getBaseProps, getInputProps, getLabelProps } = useCheckbox({
            isSelected,
            onChange: onSelect,
        });

        const styles = checkbox({ isSelected });

        return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                color="primary"
                variant="faded"
                {...getLabelProps()}
            >
                {label}
            </Chip>
        </label>
        );
    };

    const validateInput = () => {
        if (selected === "custom" && typeof customAmount === "number") {
            return customAmount >= subtotal;
        }
        return true;
    }

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="top"
            scrollBehavior="inside"
            onClose={() => {
                onClose()
            }}
            radius="md"
            hideCloseButton
            size="full"
            className="z-50"
        >
            <ModalContent className="m-4">
                <ModalHeader className="border-b border-secondary/20">
                        <div className="flex items-center gap-5">
                            <Button
                                onPress={onClose}
                                isIconOnly
                                className="bg-transparent"
                            >
                                <FiArrowLeft size={30} />
                            </Button>
                            <h1 className="text-xl">
                                Penerimaan
                            </h1>
                        </div>
                </ModalHeader>
                <ModalBody className="p-0">
                    <div className="flex h-[calc(100vh-85px)]">
                        <div className="w-[600px] border-r border-secondary/40  overflow-y-scroll flex flex-col justify-between">
                            <div className="flex flex-col gap-4">
                                {cart.map((item: IProdukInCart, index) => {
                                    return (
                                    <div key={index} className="px-5 py-2 border-b border-secondary/20 grid gap-5">
                                        <div className="flex justify-between">
                                        <span>
                                            <h4 className="text-lg">
                                                {item.title}
                                            </h4>
                                            <span className=" flex gap-3">
                                                <p className="text-primary font-semibold tracking-wider">
                                                    {convertIDR(
                                                    Number(
                                                        (item.price * item.quantity) -
                                                        (item.isPercent
                                                        ? (item.price * item.quantity * (item.isDiscount / 100))
                                                        : item.isDiscount)
                                                    )
                                                    )}
                                                </p>
                                                <p>
                                                    {item.isDiscount > 0
                                                    ? `( Diskon ${item.isPercent ? `${item.isDiscount}%` : convertIDR(item.isDiscount)} )`
                                                    : ""}
                                                </p>                            
                                            </span>
                                            {item.props !== undefined && (  
                                                <span>
                                                    <p className="text-sm">{item.title}</p>
                                                    <ul className="text-sm pl-1">
                                                        {item.props?.map(prop => {
                                                            const {quantity, title} = prop
                                                            const text = quantity === 0 ? "" : `${quantity}x ${title}`
                                                            return (
                                                            <li key={prop.code_produk}>
                                                                {text}
                                                            </li>
                                                        )})}
                                                    </ul>
                                                </span>
                                            )}
                                        </span>
                                            
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <p>
                                                {item.quantity} PCS
                                            </p>
                                        </div>
                                    </div>
                                )})}
                            </div>
                            <div className="w-full border-t border-secondary/20">
                                {(() => {
                                    const subtotal = cart.reduce((acc, item) => {
                                    const total = item.price * item.quantity;
                                    const discount = item.isPercent ? total * (item.isDiscount / 100) : item.isDiscount;
                                    const totalAfterDiscount = total - discount;
                                    return acc + totalAfterDiscount;
                                    }, 0);
                
                                    return (
                                    <>
                                        <div className="flex p-5 justify-between border-secondary/20 bg-white">
                                        <h2 className="text-xl font-bold">Subtotal</h2>
                                        <p className="font-semibold text-primary text-xl">
                                            {convertIDR(Number(subtotal))}
                                        </p>
                                        </div>
                                    </>
                                    );
                                })()}
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center gap-1 p-5 border-b border-secondary/20">
                                <p className="font-semibold text-secondary">Total Penerimaan</p>
                                <h1 className="text-4xl font-bold text-primary tracking-wide">{convertIDR(Number(subtotal))}</h1>
                            </div>
                            <div className="p-5 flex flex-col justify-center items-center">
                                <Tabs aria-label="Options" size="lg" className="w-full">
                                    <Tab key="tunai" title="Tunai" className="w-full">
                                        <div className="flex flex-col justify-between h-[calc(100vh-280px)]">
                                            <div>
                                                <p className="font-semibold text-xl">Nominal Penerimaan</p>
                                                <div className="mt-5 grid gap-5 tracking-wide">
                                                    <div className="flex gap-5">
                                                        <CustomCheckbox
                                                            label={convertIDR(exactAmount)}
                                                            isSelected={selected === "exact"}
                                                            onSelect={() => setSelected("exact")}
                                                        />
                                                        
                                                        <CustomCheckbox
                                                            label={convertIDR(roundedAmount)}
                                                            isSelected={selected === "rounded"}
                                                            onSelect={() => setSelected("rounded")}
                                                        />

                                                        <CustomCheckbox
                                                            label="Custom"
                                                            isSelected={selected === "custom"}
                                                            onSelect={() => setSelected("custom")}
                                                        />
                                                    </div>
                                                    <p className="font-semibold text-xl">Metode</p>
                                                    <div>
                                                        <div className="flex flex-wrap gap-3 tracking-wide">
                                                            <CustomCheckbox
                                                                label="Takeaway"
                                                                isSelected={selectedMethod === "takeaway"}
                                                                onSelect={() => setSelectedMethod("takeaway")}
                                                            />
                                                            <CustomCheckbox
                                                                label="Delivery"
                                                                isSelected={selectedMethod === "delivery"}
                                                                onSelect={() => setSelectedMethod("delivery")}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-5">
                                                        {selected === "custom" && (
                                                            <Input
                                                                label="Masukkan Nominal"
                                                                labelPlacement="outside"
                                                                placeholder="Rp 10.000"
                                                                type="text"
                                                                inputMode="numeric"
                                                                size="lg"
                                                                isInvalid={!validateInput()}
                                                                errorMessage={!validateInput() ? "Nominal harus lebih besar dari atau sama dengan Total Penerimaan" : ""}
                                                                value={customAmount ? convertIDR(customAmount) : ""}
                                                                onChange={(e) => {
                                                                    const raw = e.target.value.replace(/\D/g, "");
                                                                    setCustomAmount(Number(raw) || 0);
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button className="w-full font-semibold bg-primary" size="lg">
                                                Bayar
                                            </Button>
                                        </div>
                                    </Tab>
                                    <Tab key="non-tunai" title="Non Tunai" className="w-full">
                                        <div className="flex flex-col justify-between h-[calc(100vh-280px)]">
                                            <div className="grid gap-4">
                                                <p className="font-semibold text-xl">Metode Penerimaan</p>
                                                <div className="flex flex-wrap gap-3 tracking-wide">
                                                    {PAYMENT_NON_CASH.map(item => (
                                                        <CustomCheckbox
                                                            key={item.key}
                                                            label={item.label}
                                                            isSelected={selectedPayment === item.key}
                                                            onSelect={() => setSelectedPayment(item.key)}
                                                        />
                                                    ))}
                                                    
                                                </div>
                                                <p className="font-semibold text-xl">Metode</p>
                                                <div>
                                                    <div className="flex flex-wrap gap-3 tracking-wide">
                                                        <CustomCheckbox
                                                            label="Takeaway"
                                                            isSelected={selectedMethod === "takeaway"}
                                                            onSelect={() => setSelectedMethod("takeaway")}
                                                        />
                                                        <CustomCheckbox
                                                            label="Delivery"
                                                            isSelected={selectedMethod === "delivery"}
                                                            onSelect={() => setSelectedMethod("delivery")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <Button className="w-full font-semibold bg-primary" size="lg" >
                                                Bayar
                                            </Button>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalPayment;