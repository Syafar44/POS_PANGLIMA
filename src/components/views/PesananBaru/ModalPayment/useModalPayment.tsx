import { useSerial } from "@/context/SerialContext";
import { IProdukInCart } from "@/types/Produk";
import { useState } from "react";
import { convertIDR } from "@/utils/currency";
import { Chip, tv, useCheckbox, VisuallyHidden} from "@heroui/react";
import { Br, Cut, Line, Printer, Row, render, Text, Image } from 'react-thermal-printer';
import { convertTime } from "@/utils/date";

const roundToNearestThousand = (num: number) => Math.ceil(num / 10000) * 10000;

const useModalPeymanet = (cart: IProdukInCart[], subtotal: number, pelanggan: string) => {
    const { write } = useSerial();
    
    const [selected, setSelected] = useState<"exact" | "rounded" | "custom">("exact");
    const [selectedPayment, setSelectedPayment] = useState("tunai");
    const [selectedPaymentNonTunai, setSelectedPaymentNonTunai] = useState("");
    const [selectedMethod, setSelectedMethod] =useState<"Takeaway" | "Delivery">("Takeaway");
    const [customAmount, setCustomAmount] = useState<number | "">("");
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const exactAmount = subtotal;
    const roundedAmount = roundToNearestThousand(subtotal);
    const amonut = selected === "exact" ? exactAmount : selected === "rounded" ? roundedAmount : customAmount

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

    const handleSelectionChange = (key: React.Key) => {
        setSelectedPayment(String(key));
    };

    const now = new Date();

    const summary = cart.reduce(
        (acc, item) => {
            const subtotal = item.price * item.quantity;
            let discount = 0;
            if (item.isDiscount > 0) {
            if (item.isPercent) {
                discount = (subtotal * item.isDiscount) / 100;
            } else {
                discount = item.isDiscount
            }
            }

            acc.totalQuantity += item.quantity;
            acc.totalDiscount += discount;
            acc.totalPrice += subtotal - discount;

            return acc;
        },
        { totalQuantity: 0, totalDiscount: 0, totalPrice: 0 }
    );
    
    const receipt = (
        <Printer type="epson" width={31} debug={true}>
            <Image
                align="center"
                src="./images/general/logojajan.jpg"
            />
            {/* <Image
                align="center"
                src="./images/general/logogerai.jpg"
            /> */}
            <Text align="center" bold={true}>Roti Gembung Panglima - Juanda 2</Text>
            <Text align="center">RGP-J2.25.10.14.01107</Text>
            <Br />
            <Line />
            <Row left={`Pelanggan  : ${(pelanggan ?? "-")}`} right="" />
            <Row left={`Transaksi  : ${convertTime(`${now}`)}`} right="" />
            <Row left={`Karyawan   : Kasir`} right="" />

            <Line />
            <Text align='center'>{selectedMethod}</Text>
            <Line />
            
            {cart.map(produk => (
                <>
                    <Text bold={true}>{produk.title}</Text>
                    <Row left={` ${produk.quantity} x ${convertIDR(produk.price)}`} right={convertIDR(produk.price * produk.quantity)} />
                </>
            ))}

            <Line />
            <Row left="Jumlah Item      :" right={`${totalQuantity}`} />
            <Line />

            <Row left="Subtotal         :" right={`${convertIDR(subtotal + summary.totalDiscount)}`} />
            {summary.totalDiscount !== 0 && (
                <Row left="Diskon Transaksi :" right={`-${convertIDR(summary.totalDiscount)}`} />
            )}

            <Line />
            <Row left="" right={<Text bold={true}>Total : {convertIDR(subtotal)}</Text>} />
            <Line />
            {selectedPayment === "tunai" ? (
                <>    
                    <Row left="Tunai   :" right={`${convertIDR(Number(amonut))}`} />
                    <Row left="Kembali :" right={convertIDR(Number(amonut) - subtotal)} />
                </>
            ) : (
                <Row left={`${selectedPaymentNonTunai}   :`} right={`${convertIDR(subtotal)}`} />
            )}

            <Line />
            <Text align="center">Terima Kasih Telah Berbelanja di</Text>
            <Text align="center">Outlet kami ya Kak :)</Text>
            <Line />

            <Text>Whatsapp  : 082220002237</Text>
            <Text>Instagram : @Jajanpanglima</Text>
            <Text>Facebook  : @Jajan Panglima</Text>
            <Text>Website   : www.rotigembungpanglima.com</Text>
            <Br />
            <Cut lineFeeds={-6}/>
        </Printer>
    );

    const handlePrint = async (onClose: () => void, refetch: () => void) => {
        try {
            onClose()
            localStorage.removeItem("cart");
            refetch()
            const data = await render(receipt); 
            await write(data);
        } catch (err) {
            console.error("Print failed", err);
        }
    };

    return {
        selected,
        setSelected,
        selectedPayment, 
        setSelectedPayment,
        selectedPaymentNonTunai, 
        setSelectedPaymentNonTunai,
        selectedMethod, 
        setSelectedMethod,
        customAmount, 
        setCustomAmount,
        CustomCheckbox,
        handlePrint,
        handleSelectionChange,
        validateInput,
        exactAmount,
        roundedAmount,
        amonut,
    }
}

export default useModalPeymanet;