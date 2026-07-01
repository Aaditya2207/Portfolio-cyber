import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix: Next.js Turbopack incorrectly infers workspace root as C:\Users\HP
  // due to a stray package.json there. Pin it explicitly to this project.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
