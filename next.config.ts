import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // <--- 加上这一行，关闭严格模式
  eslint: {
    ignoreDuringBuilds: true, // (可选) 防止部署时因为小警告失败
  },
};

export default nextConfig;
