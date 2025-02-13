'use client';
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { MdArrowOutward } from 'react-icons/md';

interface Post {
  id: number;
  title: string;
  href: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const fetchResults = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${query}`);
        if (!res.ok) { // Check for HTTP errors
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error("Error fetching search results:", err);
        // Optionally display an error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 100);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <>
      <title>search — X</title>
      <meta name="description" content="Generated by my blog" />

      <div className="bg-[#fdf7f9] w-full min-h-screen dark:bg-[#211F21]">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-[60px] w-full max-w-[calc(100%-16px)] p-3 pl-6 pr-12 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#21182B] mt-3 ml-2 dark:focus:ring-[#e6e1e3] dark:bg-[#141314] dark:placeholder-[#CBC4CC] placeholder:text-[20px] placeholder:font-semibold dark:caret-[#CBC4CC] dark:text-white"
          ref={inputRef}
        />

        <div role="list" className="flex flex-col items-start w-[96%] mt-[48px] gap-[12px]">
          {query === '' && (
            <div className="text-black dark:text-white ml-8 text-[16px] font-medium google-sans dark:text-[#CBC4CC]">Recent searches</div>
          )}
        </div>

        <div className="space-y-2 mt-20 ml-5 flex flex-col">
            
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/posts/${result.href}`}
              className="group inline-flex items-center px-4 py-2 rounded-full transition-all max-w-fit"
              aria-label={result.title}
            >
              <span className="flex items-center group-hover:bg-[#DED8DC] dark:group-hover:bg-[#363336] px-2 py-1 rounded-full transition-all h-[50px] max-w-fit whitespace-nowrap">
                <span className="text-[24px] text-[#1C1B1F] font-normal ml-2 dark:text-white">{result.title}</span>
                <span className="text-[#1C1B1F] opacity-0 group-hover:opacity-100 transition-opacity ml-2 hover:bg-[#D3CBD0] rounded-full p-2 dark:hover:bg-[#403E40]">
                  <MdArrowOutward size={24} className="text-[#1C1B1F] dark:text-white" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}