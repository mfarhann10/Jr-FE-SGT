"use client";
import { useGetProducts } from "@/app/_hooks/useGetProducts";
import { useState } from "react";


export default function ProductList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rows = 5;

  const { products, isGetProducts } = useGetProducts({
    search,
    page,
    rows,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1); // reset ke halaman pertama
    // TanStack Query akan otomatis refetch karena queryKey berubah (search berubah)
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk..."
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {isGetProducts ? (
        <p>Loading...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {products?.length ? (
            products.map((p) => (
              <li key={p.product_id} className="py-2">
                <p className="font-semibold">{p.product_title}</p>
                <p className="text-sm text-gray-500">{p.product_category}</p>
              </li>
            ))
          ) : (
            <p>Tidak ada produk ditemukan.</p>
          )}
        </ul>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
