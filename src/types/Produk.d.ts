interface ICateory {
    category: string;
    props?: IProdukProp[];
}

interface IProdukProp {
    code_produk: string;
    title: string;
    quantity?: number; // untuk melacak jumlah prop yang dipilih
}

interface IProduk {
    code_produk: string;
    title: string;
    price?: number;
    props?: IProdukProp[];
    maxQuantity?: number;
    maxProduk?: number;
}

interface IProdukInCart {
    cartItemId: string;
    code_produk: string;
    title: string;
    price: number;
    isDiscount: number;
    isMessage: string;
    isPercent: boolean;
    quantity: number;
    maxQuantity?: number;
    maxProduk?: number;
    props?: IProdukProp[];
}

export type { ICateory, IProduk, IProdukInCart, IProdukProp };
