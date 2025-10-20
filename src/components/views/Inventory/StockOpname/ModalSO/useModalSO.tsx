import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    fullName: yup.string().required("Tolong Masukan Nama Lengkap Anda"),
});

const useModalSO = () => {
    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const {
    //     mutate: mutateAddCompetency,
    //     isPending: isPendingMutateAddCompetency,
    //     isSuccess: isSuccessMutateAddCompetency,
    // } = useMutation({
    //     mutationFn: addCompetency,
    //     onError: (error) => {
    //     setToaster({
    //         type: "error",
    //         message: error.message,
    //     });
    //     },
    //     onSuccess: () => {
    //     setToaster({
    //         type: "success",
    //         message: "Success add Competency",
    //     });
    //     reset();
    //     },
    // });

    // const handleAddCompetency = (data: ICompetency) => mutateAddCompetency(data);

    return {
        control,
        handleSubmitForm,
        errors,
        reset,
        watch,
        getValues,
        setValue,
    }
}

export default useModalSO;