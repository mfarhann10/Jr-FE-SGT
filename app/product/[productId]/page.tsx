"use client";

import { useGetDetailProduct } from "@/app/_hooks/useGetDetailProduct";
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  TagOutlined
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Divider,
  Space,
  Spin,
  Tag,
  Typography
} from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const { Title, Text, Paragraph } = Typography;

export default function ProductDetailPage() {
  const { product, isGetProduct, isError, error } = useGetDetailProduct();

  if (isGetProduct) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Space direction="vertical" align="center" size="large">
          <Spin size="large" />
          <Text type="secondary">Loading product details...</Text>
        </Space>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 p-6">
        <Alert
          message="Error Loading Product"
          description={error?.message || "Failed to fetch product details"}
          type="error"
          showIcon
          action={
            <Link href="/product">
              <Button type="primary" size="small">
                Back to Products
              </Button>
            </Link>
          }
          className="max-w-md"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 gap-4">
        <div className="text-6xl">🔍</div>
        <Title level={3} type="secondary">Product Not Found</Title>
        <Text type="secondary">The product you&apos;re looking for doesn&apos;t exist.</Text>
        <Link href="/product">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/product">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            className="mb-6 hover:bg-white"
            size="large"
          >
            Back to Products
          </Button>
        </Link>
        <Card 
          className="shadow-xl rounded-2xl overflow-hidden border-0"
          bodyStyle={{ padding: 0 }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                {product.product_image && product.product_image.trim() !== "" ? (
                  <Image
                    src={product.product_image}
                    alt={product.product_title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400 text-lg font-medium">
                    No image available
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 md:p-10 bg-white">
              <Tag 
                icon={<TagOutlined />} 
                color="blue" 
                className="mb-4 px-4 py-1 text-sm"
              >
                {product.product_category}
              </Tag>

              <Title level={2} className="mb-3 !text-gray-800">
                {product.product_title}
              </Title>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Space align="center">
                  <Text className="text-3xl font-bold text-white">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.product_price)}
                  </Text>
                </Space>
              </div>

              <Divider className="my-6" />

              <div className="mb-6">
                <Title level={5} className="!text-gray-700 mb-3">
                  Description
                </Title>
                <Paragraph className="text-gray-600 text-base leading-relaxed">
                  {product.product_description || "No description available."}
                </Paragraph>
              </div>

              <Divider className="my-6" />

              <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ 
                  width: "140px", 
                  fontWeight: 600,
                  backgroundColor: "#f8fafc"
                }}
                contentStyle={{
                  backgroundColor: "white"
                }}
                className="rounded-lg overflow-hidden border border-gray-200"
              >
                <Descriptions.Item 
                  label={
                    <Space>
                      <ClockCircleOutlined />
                      <span>Created At</span>
                    </Space>
                  }
                >
                  <Text type="secondary">
                    {dayjs(product.created_timestamp).format("DD MMMM YYYY, HH:mm")}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item 
                  label={
                    <Space>
                      <ClockCircleOutlined />
                      <span>Updated At</span>
                    </Space>
                  }
                >
                  <Text type="secondary">
                    {dayjs(product.updated_timestamp).format("DD MMMM YYYY, HH:mm")}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}