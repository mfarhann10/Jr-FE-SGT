"use client";

import { useState, useMemo } from "react";
import { Table, Input, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "@/app/types/product";
import { useGetProducts } from "@/app/_hooks/useGetProducts";
import { debounce } from "lodash";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { products, pagination, isGetProducts } = useGetProducts({
    page,
    limit,
    search,
  });

  const total = pagination?.total || 0;

  const columns: ColumnsType<Product> = [
    {
      title: "Product Title",
      dataIndex: "product_title",
      key: "product_title",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      render: (value) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(value),
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "product_category",
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "product_description",
      ellipsis: true,
    },
  ];

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setSearch(value);
      }, 300),
    []
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Product List</h2>

        <Input.Search
          placeholder="Search product..."
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 250 }}
        />
      </div>

      <Table<Product>
        columns={columns}
        dataSource={products || []}
        loading={isGetProducts}
        rowKey="product_id"
        pagination={false}
      />

      <div className="flex justify-end mt-4">
        <Pagination
          current={page}
          total={total}
          pageSize={limit}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
          showTotal={(total) => `Total ${total} products`}
        />
      </div>
    </div>
  );
}
