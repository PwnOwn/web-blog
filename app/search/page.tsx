'use client'
import { useState } from "react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Search term 1",
    "Search term 2",
    "Search term 3",
  ]);

  return (
    <div
    className="bg-[#fdf7f9] w-full min-h-screen dark:bg-[#211F21]">
    <input
    type="text"
    placeholder="Search"
  
    className="h-[60px] w-full max-w-[calc(100%-16px)] p-3 pl-6 pr-12 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#21182B] mt-3 ml-2 dark:focus:ring-[#e6e1e3] dark:bg-[#141314] dark:placeholder-[#CBC4CC] placeholder:text-[20px]  placeholder:font-semibold dark:caret-[#CBC4CC]"/>
  </div>
  );
}