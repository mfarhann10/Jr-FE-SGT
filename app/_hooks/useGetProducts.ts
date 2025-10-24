"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../_lib/axiosClient";
import { ProductListParams } from "../types/product";

export const useGetProducts = (params: Partial<ProductListParams>) => {
  const { data, isPending: isGetProducts } = useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });

  return {
    products: data?.data || [],
    pagination: data?.pagination,
    isGetProducts,
  };
};
