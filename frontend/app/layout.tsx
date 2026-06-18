import type { Metadata } from "next";

// Safe Escape Hatch: Commented out to prevent Next.js Turbopack path engine crashes
// import "./globals.css";

export const metadata: Metadata = {
  title: "Aura-X LPG Distribution System",
  description: "National Real-time Telemetry Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet open-source mapping core stylesheet CDN link */}
        <link
          rel="stylesheet"
          href="https://unpkg.com"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        {/* Self-contained CSS Engine: Injects all styles directly so you don't need a globals.css link */}
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f5f7;
            color: #171717;
            font-family: Arial, Helvetica, sans-serif;
            height: 100vh;
          }
          .leaflet-container {
            width: 100%;
            height: 100%;
            z-index: 1;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
