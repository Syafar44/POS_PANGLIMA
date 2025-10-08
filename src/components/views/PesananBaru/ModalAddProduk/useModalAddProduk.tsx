import { Dummy_RGP } from "@/dummy/contants";
import { IProduk } from "@/types/Produk";
import { useState } from "react";

const useModalAddProduk = () => {
    const [quantity, setQuantity] = useState(1);
    const [isPercent, setIsPercent] = useState(false);
    const [isDiscount, setIsDiscount] = useState("0");
    const [isMessage, setIsMessage] = useState("");

    const findProductByCode = (code: string) => {
        for (const category of Dummy_RGP) {
            const found = category.data.find((item) => item.code_produk === code);
            if (found) {
                return { ...found, category: category.category };
            }
        }
        return null;
    };

    const handleAddCart = (produk: IProduk, onClose: () => void, refetchCart: () => void) => {
        const localStorageCart = localStorage.getItem("cart");
        const cart = localStorageCart ? JSON.parse(localStorageCart) : [];
        const foundIndex = cart.findIndex((item: IProduk) => item.code_produk === produk.code_produk);

        if (foundIndex !== -1) {
            cart[foundIndex].quantity += quantity;
        } else {
            cart.push({
                code_produk: produk.code_produk,
                title: produk.title,
                quantity,
                isPercent,
                isDiscount: Number(isDiscount),
                isMessage: isMessage || "",
                price: produk.price,
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        onClose();
        setIsDiscount("0")
        setIsMessage("")
        setQuantity(1)
        refetchCart()
    };

    return {
        quantity,
        setQuantity,
        isPercent,
        setIsPercent,
        isDiscount,
        setIsDiscount,
        isMessage,
        setIsMessage,
        findProductByCode,
        handleAddCart,
    }
}

export default useModalAddProduk;