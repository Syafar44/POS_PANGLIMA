import { Dummy_RGP } from "@/dummy/contants";
import { ICateory, IProduk, IProdukInCart, IProdukProp } from "@/types/Produk";
import { useEffect, useState } from "react";

const useModalUpdateProduk = () => {
    const [quantity, setQuantity] = useState(1);
    const [isPercent, setIsPercent] = useState(false);
    const [isDiscount, setIsDiscount] = useState<number>(0);
    const [isMessage, setIsMessage] = useState("");

    const [selectedProps, setSelectedProps] = useState<IProdukProp[]>([]);

    const [cart, setCart] = useState<IProdukInCart[]>(() => {
        try {
            if (typeof window === "undefined") return [];
            const raw = localStorage.getItem("cart");
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.warn("Gagal membaca localStorage cart:", err);
            return [];
        }
    });

    const refetchCartFromStorage = () => {
        try {
            if (typeof window === "undefined") return;
            const raw = localStorage.getItem("cart");
            const parsed = raw ? JSON.parse(raw) : [];
            setCart(parsed);
            console.log("✅ cart disinkron ulang dari localStorage:", parsed);
        } catch (err) {
            console.warn("Gagal refetch cart:", err);
        }
    };

    useEffect(() => {
        refetchCartFromStorage();
    }, []);

    useEffect(() => {
        try {
            if (typeof window === "undefined") return;
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log("💾 cart tersimpan ke localStorage:", cart);
        } catch (err) {
            console.warn("Gagal menulis ke localStorage cart:", err);
        }
    }, [cart]);

    const findProductById = (id: string) => {
        const foundInCart = cart.find((item) => item.cartItemId === id);

        if (!foundInCart) return null;
        let foundInDummy: ICateory | null = null;
        for (const category of Dummy_RGP) {
            const found = category.data.find(
                (item: IProduk) => item.code_produk === foundInCart.code_produk
            );
            if (found) {
                foundInDummy = { ...found, category: category.category };
                break;
            }
        }

        if (!foundInDummy) return foundInCart;

        const mergedProps = foundInDummy.props?.map((dummyProp: IProduk) => {
            const match = foundInCart.props?.find(
                    (p: IProduk) => p.code_produk === dummyProp.code_produk
            );
            return {
                ...dummyProp,
                quantity: match ? match.quantity : 0,
            };
        });
        
        return {
            ...foundInDummy,
            ...foundInCart,
            props: mergedProps,
        };
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

    const getTotalSelectedProps = () => selectedProps.reduce((sum, p) => sum + (p.quantity || 0), 0);

    const handleUpdateCart = (
        cartItemId: string,
        onClose: () => void,
        refetchCart: () => void,
    ) => {
        const index = cart.findIndex((item: IProdukInCart) => item.cartItemId === cartItemId);

        if (index === -1) {
            console.warn("Produk tidak ditemukan di keranjang, tidak dapat diupdate.");
            return;
        }

        const updatedItem: IProdukInCart = {
            ...cart[index],
            quantity,
            isPercent,
            isDiscount: Number(isDiscount) || 0,
            isMessage: isMessage || "",
            ...(selectedProps && selectedProps.length > 0
                ? { props: selectedProps }
                : {}),
        };

        const newCart = [...cart];
        newCart[index] = updatedItem;

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        
        refetchCart();

        onClose();
        setIsDiscount(0);
        setIsMessage("");
        setQuantity(1);
        setSelectedProps([]);
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
        findProductById,
        handleUpdateCart,
        setSelectedProps,
        cart,
        refetchCartFromStorage,
    }
}

export default useModalUpdateProduk;