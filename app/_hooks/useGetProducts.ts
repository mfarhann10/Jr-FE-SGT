import { useQuery } from "@tanstack/react-query"
import { ProductListParams } from "../types/product"
import { getProducts } from "../_lib/axiosClient"

export const useGetProducts = (params: ProductListParams) => {
  const {page, limit, offset, search} = params

  const {data: products, isPending: isGetProducts} = useQuery({
    queryKey: ["products", {page, limit, offset, search}],
    queryFn: () => getProducts(params),
  })

  return {products, isGetProducts}
}