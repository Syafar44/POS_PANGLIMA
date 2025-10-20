import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import { Controller } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import useModalSO from "./useModalSO";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    accepted: Record<string, number>;
    enteredBy: string
    selectedId: string

}

const ModalSO = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, accepted, enteredBy, selectedId, } = props;
    const {
        control,
        handleSubmitForm,
        errors,
        reset,
        watch,
        getValues,
        setValue,
    } = useModalSO()

    console.log("accepted", accepted)

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside"
            onClose={() => {
                onClose()
            }}
            radius="md"
            hideCloseButton
            size="xl"
            className="z-50"
        >
            <ModalContent className="m-4">
                <ModalHeader className="border-b border-secondary/20">
                        <div className="flex items-center gap-5">
                            <Button
                                onPress={onClose}
                                isIconOnly
                                className="bg-transparent"
                            >
                                <FiArrowLeft size={30} />
                            </Button>
                            <h1 className="text-xl">
                                Konfirmasi Penerimaan
                            </h1>
                        </div>  
                </ModalHeader>
                <ModalBody className="p-5">
                    <div>
                        <h1>Informasi Penerimaan</h1>
                        <div className="pb-5">
                            <p>
                                No. SO : {selectedId}
                            </p>
                            <p>
                                Diterima Oleh: {enteredBy}
                            </p>
                        </div>
                        <form onSubmit={() => {handleSubmitForm}}>
                            <Controller 
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        label="Konfirmasi Penerimaan"
                                        labelPlacement="outside"
                                        placeholder="Ketikan nama anda"
                                        variant="bordered"
                                        type="text"
                                        isInvalid={errors.fullName !== undefined}
                                        errorMessage={errors.fullName?.message}
                                        className="mb-2"
                                        size="lg"
                                    />
                                )}
                            />
                            <div className="flex justify-end mt-5">
                                <Button type="submit" className="bg-primary" size="lg">
                                    Konfirmasi
                                </Button>
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalSO;