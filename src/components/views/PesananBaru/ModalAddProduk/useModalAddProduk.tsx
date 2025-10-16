import { Dummy_RGP } from "@/dummy/contants";
import { IProduk } from "@/types/Produk";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

const useModalAddProduk = () => {
    const [quantity, setQuantity] = useState(1);
    const [isPercent, setIsPercent] = useState(false);
    const [isDiscount, setIsDiscount] = useState<number | "">("");
    const [isMessage, setIsMessage] = useState("");

    const [selectedProps, setSelectedProps] = useState<
        { code_produk: string; title: string; quantity: number }[]
    >([]);

    const findProductByCode = (code: string) => {
        for (const category of Dummy_RGP) {
            const found = category.data.find((item) => item.code_produk === code);
            if (found) {
                return { ...found, category: category.category };
            }
        }
        return null;
    };

    const toggleProp = (prop: IProduk, maxProduk?: number) => {
        setSelectedProps((prevSelected) => {
            const totalSelected = prevSelected.reduce((sum, p) => sum + (p.quantity || 0), 0);
            if (maxProduk && totalSelected >= maxProduk) {
            return prevSelected;
            }
            const existing = prevSelected.find((p) => p.code_produk === prop.code_produk);

            if (existing) {
            return prevSelected.map((p) =>
                p.code_produk === prop.code_produk
                ? { ...p, quantity: (p.quantity || 0) + 1 }
                : p
            );
            } else {
            return [...prevSelected, { ...prop, quantity: 1 }];
            }
        });
    };

    const getTotalSelectedProps = () => selectedProps.reduce((sum, p) => sum + p.quantity, 0);

    const handleAddCart = (
        produk: IProduk,
        onClose: () => void,
        refetchCart: () => void
    ) => {
        const localStorageCart = localStorage.getItem("cart");
        const cart = localStorageCart ? JSON.parse(localStorageCart) : [];
        const normalizedProps = selectedProps && selectedProps.length > 0 ? selectedProps : [];
        const foundIndex = cart.findIndex(
            (item: IProduk) =>
            item.code_produk === produk.code_produk &&
            JSON.stringify(item.props || []) === JSON.stringify(normalizedProps)
        );

        if (foundIndex !== -1) {
            cart[foundIndex].quantity += quantity;
        } else {
            cart.push({
                cartItemId: uuidv4(),
                code_produk: produk.code_produk,
                title: produk.title,
                quantity,
                isPercent,
                isDiscount: Number(isDiscount),
                isMessage: isMessage || "",
                price: produk.price,
                props: normalizedProps.length > 0 ? normalizedProps : undefined,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        onClose();

        setIsDiscount(0);
        setIsMessage("");
        setQuantity(1);
        setSelectedProps([]);

        refetchCart();
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
        toggleProp,
        selectedProps,
        getTotalSelectedProps,
        findProductByCode,
        handleAddCart,
        setSelectedProps,
    }
}

export default useModalAddProduk;