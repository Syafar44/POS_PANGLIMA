interface ICateory {
    category: string;
}

interface IProduk {
    code_produk: string;
    title: string;
    price: number;
}

interface IProdukInCart {
    code_produk: string;
    title: string;
    price: number;
    isDiscount: number;
    isMessage: string;
    isPercent: boolean;
    quantity: number;
}

export type { ICateory, IProduk, IProdukInCart };
