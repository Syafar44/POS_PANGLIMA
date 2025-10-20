import { useState } from "react";
import { Selection } from "@react-types/shared";

const usePenerimaan = () => {

    const rows = [
        {
            kode_barang: "AJ.003",
            nama_barang: "Adonan Roti Gembung",
            quantity: 75,
            satuan: "PCS",
            Keterangan: ""
        },
        {
            kode_barang: "AJ.004",
            nama_barang: "Bolen Keju jajan",
            quantity: 25,
            satuan: "PCS",
            Keterangan: ""
        },
        {
            kode_barang: "AJ.005",
            nama_barang: "Brownies Bitter",
            quantity: 16,
            satuan: "PCS",
            Keterangan: ""
        },
        {
            kode_barang: "AJ.006",
            nama_barang: "Roti Tawar",
            quantity: 2,
            satuan: "PCS",
            Keterangan: ""
        },
        {
            kode_barang: "AJ.007",
            nama_barang: "Sosis Solo",
            quantity: 12,
            satuan: "PCS",
            Keterangan: ""
        },
    ];

    const columns = [
    {
        key: "kode_barang",
        label: "KODE BARANG",
    },
    {
        key: "nama_barang",
        label: "NAMA BARANG",
    },
    {
        key: "quantity",
        label: "QTY",
    },
    {
        key: "satuan",
        label: "SATUAN",
    },
    {
        key: "keterangan",
        label: "KETERANGAN",
    },
    ];

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [enteredBy, setEnteredBy] = useState<Selection>(new Set([]));
    const [selectedId, setSelectedId] = useState("JPJ1002823 - SJ00234");

    const name =
        enteredBy === "all"
            ? "Semua"
            : Array.from(enteredBy)[0] || "";

    const [selectionState, setSelectionState] = useState<Record<string, number>>(
        Object.fromEntries(rows.map(row => [row.kode_barang, 0]))
    );


    const handleSelectionChange = (keys: Selection) => {
        setSelectedKeys(keys);
        const updatedState = Object.fromEntries(
            rows.map(row => [
                row.kode_barang,
                keys === "all" ? 1 : (keys instanceof Set && keys.has(row.kode_barang) ? 1 : 0)
            ])
        );

        setSelectionState(updatedState);
    };

    return {
        rows,
        columns,
        selectedKeys, 
        setSelectedKeys,
        enteredBy,
        setEnteredBy,
        selectedId, 
        setSelectedId,
        name,
        selectionState,
        setSelectionState,
        handleSelectionChange,
    }
}

export default usePenerimaan