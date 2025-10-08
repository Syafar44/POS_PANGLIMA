import { FiBook, FiClipboard, FiFileText, FiSettings, FiShoppingCart, FiUser, FiUsers } from "react-icons/fi";

const CONTANTS = [
    {
        title: "Pesanan Baru",
        icon: <FiShoppingCart size={30} />,
        href: "/pesanan-baru",
    },
    {
        title: "Open Bill",
        icon: <FiClipboard size={30} />,
        href: "/open-bill",
    },
    {
        title: "Riwayat Penjualan",
        icon: <FiFileText size={30} />,
        href: "/riwayat-penjualan",
    },
    {
        title: "Pelanggan",
        icon: <FiUsers size={30} />,
        href: "/pelanggan",
    },
    {
        title: "Karyawan",
        icon: <FiUser size={30} />,
        href: "/karyawan",
    },
    {
        title: "Laporan",
        icon: <FiBook size={30} />,
        href: "/laporan",
    },
    {
        title: "Pengaturan",
        icon: <FiSettings size={30} />,
        href: "/pengaturan",
    },
]

export default CONTANTS;