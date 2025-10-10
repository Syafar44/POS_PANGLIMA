import { convertIDR } from "@/utils/currency";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    payment: string;
}

const ModalPayment = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, payment } = props;

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            onClose={onClose}
            hideCloseButton
            size="3xl"
        >
            <ModalContent>
                <ModalHeader className="flex items-center justify-between border-b border-secondary/30">
                    <span>
                        <h3 className="text-xl">
                            {payment === "tunai" ? "Pembayaran Tunai" : "Pembayaran Qris"}
                        </h3>
                        <p className="text-secondary font-normal">27 Transaksi Penerimaan</p>
                    </span>
                    <FiSearch size={24} />
                </ModalHeader>
                <ModalBody>
                    <div className="py-5 border-b border-secondary/30 flex justify-between">
                        <span>
                            <h5 className="text-xl uppercase">
                                jpashjdgsdfh
                            </h5>
                            <p>Diterima Wildan</p>
                        </span>
                        <span className="text-end">
                            <p>10 Okt 2025, 13:34</p>
                            <h5 className="text-xl text-primary ">
                                {convertIDR(20000)}
                            </h5>
                        </span>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalPayment;