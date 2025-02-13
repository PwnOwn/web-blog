import type { Metadata } from "next";

import "./globals.css";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

import { Inter } from 'next/font/google'; // 示例：使用 Google Fonts
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: "X",
  description: "Generated by my blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans&display=swap" rel="stylesheet"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>

      <body className={inter.className} id='main-content'> 
              {/* 跳过链接，设置 focus 时可见 */}
      <Link
          href="#main-content"
          className="absolute top-[-40px] left-0 px-4 py-2 bg-black text-white font-bold focus:top-0 focus:z-10 focus:block focus:outline-none focus:focus:ring-2 focus:focus:ring-blue-500"
          aria-label="Skip to main content"
        >
          Skip to main content
        </Link>
        <div className="flex min-h-screen flex-col  dark:bg-[#141314] ">
          <Sidebar />
          
          <main className="flex-1 md:ml-[98px] md:mt-0 mt-[75px]">{children}</main>
          <div className='md:ml-[98px]'>
          <Footer />
          </div>
          
        </div>

      </body>
    </html>
  );
}
