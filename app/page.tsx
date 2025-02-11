'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    console.log('Button clicked');
    router.push('/get-started');
  
  };

  return (
    <main className="flex-1">
      <section>
        <div className="min-h-screen bg-gray-50 flex items-center">
          <div className="max-w-3xl mx-auto px-8 py-16">
            <h1 className="text-6xl font-normal mb-6 tracking-normal">
              Welcome to my blog
            </h1>
            <div className="space-y-1 text-gray-800 mb-8">
              <p>Material 3 is the latest version of Google's open-source design system.</p>
              <p>Design and build beautiful, usable products with Material 3.</p>
            </div>
            <button
              onClick={handleClick}
              className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors duration-200"
            >
              Get started
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}