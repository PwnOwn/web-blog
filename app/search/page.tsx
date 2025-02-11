// app/search/page.tsx

'use client';
import Link from "next/link"
import { useState, useEffect } from 'react';
import { MdArrowOutward } from 'react-icons/md';
interface Post {
  id: number;
  title: string;
  Route: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  


  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {

      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error(err);
      } finally {

      }
    };

    const debounce = setTimeout(fetchResults, 100);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <>

      <title>search — my blog</title>
      <meta name="description" content="Generated by my blog" />

      <div className="bg-[#fdf7f9] w-full min-h-screen dark:bg-[#211F21]">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-[60px] w-full max-w-[calc(100%-16px)] p-3 pl-6 pr-12 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#21182B] mt-3 ml-2 dark:focus:ring-[#e6e1e3] dark:bg-[#141314] dark:placeholder-[#CBC4CC] placeholder:text-[20px] placeholder:font-semibold dark:caret-[#CBC4CC]"
        />

<div role="list" className="flex flex-col items-start w-[96%] mt-[48px] gap-[12px]">
      {query === '' && (
        <div className="ml-8 text-[16px] font-medium font-google-sans">Recent searches</div>
      )}
      </div>


        <ul className="space-y-2 mt-20 ml-5">
          {results.map((result) => (
  <Link 
  key={result.id}
            href={result.Route}
   className="group flex items-center w-auto px-4 py-2 rounded-full transition-all block">
  <div className="flex items-center group-hover:bg-[#DED8DC] px-2 py-1 rounded-full transition-all h-[50px]">
    <span className="text-[24px] text-[#1C1B1F] font-normal ml-2">{result.title}</span>
    <div className="text-[#1C1B1F] opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:bg-[#D3CBD0] rounded-full p-2">
      <MdArrowOutward size={24} />
    </div>
  </div>
</Link>

    
          ))}
        </ul>

      </div>
    </>
  );
}
