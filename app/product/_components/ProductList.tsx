"use client";

import { useGetProducts } from "@/app/_hooks/useGetProducts";
import { Product } from "@/app/types/product";
import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { debounce } from "lodash";
import Link from "next/link";
import { useMemo, useState } from "react";
import ProductModal from "./ProductModal";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link href={`product/${record.product_id}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          />
        </Space>
      ),
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

  if (isGetProducts) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Product List</h2>

        <div className="flex gap-5 items-center">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Add Product
          </Button>
          <Input.Search
            placeholder="Search product by title, category or description"
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 350 }}
          />
        </div>
      </div>

      <Table<Product>
        columns={columns}
        dataSource={products || []}
        loading={isGetProducts}
        rowKey="product_id"
        pagination={false}
      />

      <ProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        defaultValues={selectedProduct || undefined}
        productId={selectedProduct?.product_id}
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
