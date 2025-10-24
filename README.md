# 🛍️ Product Management Dashboard

A modern **Product Management Dashboard** built with **Next.js 14**, **Ant Design**, **Tailwind CSS**, **React State Management**, and **TanStack React Query**.  
This project allows users to **view, search, create, edit, and delete products** with smooth UI interaction and API integration.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **UI Library:** [Ant Design](https://ant.design/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Form Management:** [Ant Design](https://ant.design/)
- **Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Utility:** [Lodash (debounce)](https://lodash.com/)
- **TypeScript:** for static type checking and maintainability

---

## 💡 Features

### 🔍 Product Management
- View product list in a responsive **Ant Design Table**
- **Search** products by:
  - `product_title`
  - `product_description`
  - `product_category`
- **Pagination** with dynamic page number
- **Loading** and **empty state** indicators
- **Fallback image** when `product_image` is `null`

### ➕ Create & Edit Product
- Create new product using **Ant Design Modal Form**
- Edit existing product in a modal with prefilled data
- Form validation handled by **Ant Design Form**
- Automatic refetch after create/edit using **React Query invalidation**


### 🧭 Navigation & Routing
- `/product` as main page 
- `/product/[id]` for product detail page with image preview and metadata


---

## 🧠 Application Flow

1. **Page Load**
   - `useQuery` fetches product list from Next API.
2. **Search**
   - User types in the search bar.
   - Input is **debounced (500ms)** to reduce API calls.
   - Query refetches product data matching search keywords.
3. **Create / Edit**
   - User opens modal → fills form → submits.
   - On success → closes modal and triggers query refetch.
4. **Detail Page**
   - Displays product image, title, category, description.
   - If `product_image` is null → shows fallback `/placeholder.png`.

---

## ⚙️ Getting Started

### 1. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
