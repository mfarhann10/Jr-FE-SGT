import { getProducts } from "@/app/_lib/axiosServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const response = await getProducts({ page, limit, search });

    return NextResponse.json(
      {
        data: response.data,
        pagination: response.pagination,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  }
}

