import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct as createProductApi, ProductPayload } from "../_lib/axiosClient"
import toast from "react-hot-toast"
import { AxiosError } from "axios";

type ApiErrorResponse = {
  message?: string;
  status?: string;
  code?: number;
  errors?: Record<string, string[]>;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  const {mutate: createProduct, isPending: isCreatingProduct} = useMutation({
    mutationFn: (payload: ProductPayload) => createProductApi(payload),
    onSuccess: () => {
      toast.success("Product created succesfully !")
      queryClient.invalidateQueries({queryKey: ["products"]})
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create product";
      toast.error(message);
    },
  })

  return {createProduct, isCreatingProduct}
}