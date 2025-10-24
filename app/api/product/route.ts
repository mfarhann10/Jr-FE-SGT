import { NextResponse } from "next/server";
import {
  getSingleProduct,
  createProduct,
  editProduct,
} from "@/app/_lib/axiosServer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    if (!product_id) {
      return NextResponse.json(
        { message: "Missing product_id" },
        { status: 400 }
      );
    }

    const product = await getSingleProduct(product_id);
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Failed to fetch product", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = await createProduct(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { product_id, ...payload } = body;

    if (!product_id) {
      return NextResponse.json(
        { message: "Missing product_id" },
        { status: 400 }
      );
    }

    const updated = await editProduct(product_id, payload);
    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Failed to update product", error: error.message },
      { status: 500 }
    );
  }
}
