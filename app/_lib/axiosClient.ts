// Axios client for proxy/middleware layer internal Next API
import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { Product, ProductListParams } from "../types/product";

interface ProductResponse {
  error_code?: string;
  is_success?: boolean;
  status_code?: string;
  data: Product[];
  pagination: ProductListParams;
}

interface SingleProductResponse {
  error_code?: string;
  is_success?: boolean;
  status_code?: string;
  data: Product;
}

export type ProductPayload = Omit<
  Product,
  "product_id" | "created_timestamp" | "updated_timestamp"
>;

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, please login again.");
    }
    return Promise.reject(error);
  }
);

export const getProducts = async (
  params?: Partial<ProductListParams>
): Promise<ProductResponse> => {
  try {
    const { data } = await axiosClient.get<ProductResponse>("/products", {
      params,
    });

    return {
      data: data.data ?? [],
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      data: [],
      pagination: { page: 1, limit: 10, total: 0, total_pages: 0, search: "" },
    };
  }
};

export const getSingleProduct = async (
  product_id: string
): Promise<Product> => {
  const { data } = await axiosClient.get<Product>(
    `/product?product_id=${product_id}`
  );
  return data;
};

export const createProduct = async (
  payload: ProductPayload
): Promise<Product> => {
  const { data } = await axiosClient.post<SingleProductResponse>(
    "/product",
    payload
  );

  return data.data;
};

export const editProduct = async (
  product_id: string,
  payload: ProductPayload
): Promise<Product> => {
  const { data } = await axiosClient.put<SingleProductResponse>(
    `/product?product_id=${product_id}`,
    payload
  );

  return data.data;
};



