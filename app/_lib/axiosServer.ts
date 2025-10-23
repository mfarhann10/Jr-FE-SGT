// Axios server for call backend api
import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { getToken } from "./utils/token";
import { Product, ProductListParams } from "../types/product";


interface ProductResponse {
  error_code: string;
  is_success: boolean;
  status_code: string;
  data: Product[];
  pagination: ProductListParams
}

interface SingleProductResponse{
  error_code: string;
  is_success: boolean;
  status_code: string;
  data: Product;
  pagination: ProductListParams
}

export type ProductPayload = Omit<Product, "product_id" | "created_timestamp" | "updated_timestamp">

const baseURL = process.env.EXTERNAL_BASE_URL;

const axiosServer: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosServer.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosServer.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, please login again.");
    }
    return Promise.reject(error);
  }
);

export const getProducts = async (params?: Partial<ProductListParams>): Promise<Product[]> => {
  try {
    const { data } = await axiosServer.get<ProductResponse>(
      "/api/web/v1/products",
      { params }
    );
    return data.data;
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return [];
  }
};


export const getSingleProduct = async (product_id: string): Promise<Product> => {
  const {data} = await axiosServer.get<SingleProductResponse>(`/api/web/v1/product?product_id=${product_id}`)
  return data.data
}

export const createProduct = async (
  payload: ProductPayload
): Promise<Product> => {
  const {data} = await axiosServer.post<SingleProductResponse>("/api/web/v1/product", payload)

  return data.data
}

export const editProduct = async (
  product_id: string,
  payload: ProductPayload
): Promise<Product> => {
  const {data} = await axiosServer.put<SingleProductResponse>(`/api/web/v1/product?product_id=${product_id}`, payload)

  return data.data
}