import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleProduct } from "../_lib/axiosClient";

export const useGetDetailProduct = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isPending: isGetProduct,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId!),
    enabled: !!productId,
  });

  return { product, isGetProduct, isError, error };
};