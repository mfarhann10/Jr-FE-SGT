"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/product");
    }, 1000); // sedikit delay biar smooth

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-4">
        <Spin size="large" />
        <p className="text-gray-600 text-sm font-medium">
          Redirecting to Products...
        </p>
      </div>
    </div>
  );
}
