import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configures cross-origin developer origins to eliminate network telemetry warning bars
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000", "192.168.1.91:3000"],
  
  // Ensures compatibility with third-party tracking scripts if necessary
  transpilePackages: ["react-leaflet", "leaflet"],
};

module.exports = nextConfig;
