//src\app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";  // No need to import Inter if not using it
import Head from 'next/head';  // Import the Head component

export const metadata: Metadata = {
  title: "NutriMate- Feed Your Cravings",
  description: "Discover culinary treasures from around the world with NutriMate. Find your perfect dish without the hassle, with step-by-step guidance and expert tips.",
  keywords: "NutriMate, recipes, culinary, food, cooking, cuisine, discover, explore, guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />  {/* Link to the favicon */}
      </Head>
      <body>{children}</body>
    </html>
  );
}
