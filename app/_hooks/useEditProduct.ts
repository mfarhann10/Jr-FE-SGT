import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editProduct as editProductApi, ProductPayload } from "../_lib/axiosClient"
import toast from "react-hot-toast"
import { AxiosError } from "axios";

type ApiErrorResponse = {
  message?: string;
  status?: string;
  code?: number;
  errors?: Record<string, string[]>;
};

export const useEditProduct = () => {
  const queryClient = useQueryClient()

  const {mutate: editProduct, isPending: isEditingProduct} = useMutation({
    mutationFn: ({id, payload}: {id: string, payload: ProductPayload}) => editProductApi(id, payload),
    onSuccess: () => {
      toast.success("Product edited succesfully !")
      queryClient.invalidateQueries({queryKey: ["products"]})
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to edit product";
      toast.error(message);
    },
  })

  return {editProduct, isEditingProduct}
}