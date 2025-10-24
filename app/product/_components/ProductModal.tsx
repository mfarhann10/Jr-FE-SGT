"use client";

import { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { ProductPayload } from "@/app/_lib/axiosClient";
import { useCreateProduct } from "@/app/_hooks/useCreateProduct";
import { useEditProduct } from "@/app/_hooks/useEditProduct";


interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  defaultValues?: ProductPayload | null;
  productId?: string;
}

export default function ProductModal({
  open,
  onClose,
  mode,
  defaultValues,
  productId,
}: ProductModalProps) {
  const [form] = Form.useForm<ProductPayload>();
  const { createProduct, isCreatingProduct } = useCreateProduct();
  const { editProduct, isEditingProduct } = useEditProduct();

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues);
    } else {
      form.resetFields();
    }
  }, [defaultValues, form, open]);

  const handleSubmit = (values: ProductPayload) => {
    if (mode === "create") {
      createProduct(values, { onSuccess: onClose });
    } else if (mode === "edit" && productId) {
      editProduct({ id: productId, payload: values }, { onSuccess: onClose });
    }
  };


  return (
    <Modal
      open={open}
      title={mode === "create" ? "Create Product" : "Edit Product"}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={mode === "create" ? "Create" : "Update"}
      confirmLoading={isCreatingProduct || isEditingProduct}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={defaultValues || {}}
      >
        <Form.Item
          label="Product Title"
          name="product_title"
          rules={[{ required: true, message: "Please enter product title" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="product_price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Enter product price"
          />
        </Form.Item>

        <Form.Item label="Description" name="product_description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item label="Category" name="product_category">
          <Input placeholder="Enter product category" />
        </Form.Item>

        <Form.Item label="Image URL" name="product_image">
          <Input placeholder="https://example.com/image.png" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
