import type { Metadata } from "next";

import "./globals.css";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

import { Inter } from 'next/font/google'; // 示例：使用 Google Fonts

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col bg-[#fdf7f9] dark:bg-[#211F21]">
          <Sidebar />
          <main className="flex-1 ml-[86px]">{children}</main>
          <div className='ml-[86px]'>
          <Footer />
          </div>
          
        </div>

      </body>
    </html>
  );
}
