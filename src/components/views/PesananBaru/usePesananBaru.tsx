import { Dummy_Pelanggan, Dummy_RGP } from "@/dummy/contants";
import { IProdukInCart } from "@/types/Produk";
import { useEffect, useMemo, useState } from "react";

const usePesananBaru = () => {
    const [selectedCategory, setSelectedCategory] = useState(Dummy_RGP[0].category);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedId, setSelectedID] = useState('');
    const [searchPhone, setSearchPhone] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const onInputChange = (value: string) => {
        setSearchPhone(value);
    };

    const filteredItems = useMemo(() => {
        const found = Dummy_RGP.find(item => item.category === selectedCategory);
        return found ? found.data : [];
    }, [selectedCategory]);
    
    const allProducts = useMemo(() => {
        return Dummy_RGP.flatMap((item) =>
        item.data.map((product) => ({
            ...product,
            category: item.category,
        }))
        );
    }, []);

    const searchedItems = useMemo(() => {
        if (!searchTerm.trim()) return allProducts;
        return allProducts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allProducts]);

    const [cart, setCart] = useState<IProdukInCart[]>([]);

    const refetchCart = () => {
        if (typeof window !== "undefined") {
            const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCart(savedCart);
        }
    };

    useEffect(() => {
        refetchCart();
    }, []);

    const increaseQuantity = (code_produk: string) => {
        const updatedCart = cart.map((item) =>
            item.code_produk === code_produk ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const decreaseQuantity = (code_produk: string) => {
        const updatedCart = cart
        .map((item) =>
            item.code_produk === code_produk
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const deleteProduct = (code_produk: string) => {
        const updatedCart = cart.filter((item) => item.code_produk !== code_produk);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };
    
    const filteredCustomers = useMemo(() => {
        if (!searchPhone) return Dummy_Pelanggan;
            return Dummy_Pelanggan.filter((customer) =>
            customer.phone_number.includes(searchPhone)
        );
    }, [searchPhone]);

    return {
        filteredCustomers,
        selectedCategory,
        setSelectedCategory,
        isSearching,
        setIsSearching,
        selectedId,
        setSelectedID,
        cart,
        filteredItems,
        searchPhone,
        setSearchPhone,
        onInputChange,
        refetchCart,

        increaseQuantity,
        decreaseQuantity,
        deleteProduct,
        searchedItems,
        searchTerm,
        setSearchTerm,
    }
}

export default usePesananBaru