'use client'; // 确保这行在文件顶部

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import BlogCard from "../components/ui/blog-card";
import MaterialDesignHero from "../components/pagehader";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  imageURL: string;
  year: number; // 确保 year 是数字类型
  href: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activeYear, setActiveYear] = useState(2024);
  const [years, setYears] = useState<number[]>([]);

  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = parseInt(entry.target.id);
          setActiveYear(year);
        }
      });
    },
    []
  );

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch('/api/blog-posts');
        if (!res.ok) {
          throw new Error(`Failed to fetch blog posts: ${res.status}`);
        }
        const data = await res.json();

        // 确保 data.posts 是一个数组
        if (Array.isArray(data.posts)) {
          setBlogPosts(data.posts);

          // 提取年份并去重
          const uniqueYears = extractUniqueYears(data.posts);
          setYears(uniqueYears);
        } else {
          console.error("Expected data.posts to be an array");
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);
  const extractUniqueYears = (posts: BlogPost[]) => {
    return Array.from(
      new Set(posts.map((post) => post.year))
    ).sort((a, b) => b - a);
  };
  useEffect(() => {
    const observers = years.map((year) => {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });

      if (yearRefs.current[year]) {
        observer.observe(yearRefs.current[year]!);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [handleIntersection, years]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  return (
    <div className="dark:text-white ">
      <MaterialDesignHero
        videoUrl="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
        date=""
        title="My Blog"
        description="Read the latest and greatest about Material Design"
        titleSize = "text-[48px] md:text-[64px]"
      />
      <div className="md:max-w-7xl mx-auto px-4 sm:px-6 py-12 ">
        <div className="grid lg:grid-cols-[1fr,300px] gap-12">
          <main className="">
            <h1 className="text-5xl font-bold mb-16">All blog posts</h1>

            {years.map((year) => (
              <div
                key={year}
                id={String(year)}
                ref={(el) => {
                  if (el) yearRefs.current[year] = el;
                }}
              >
                <h2 className="text-3xl font-bold mb-8">{year}</h2>
                {blogPosts.filter((post) => post.year === year).length === 0 ? (
                  <p>No blog posts for this year.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px] mb-3 h-full w-full">
                    {blogPosts
                      .filter((post) => post.year === year)
                      .map((post) => (
                        <article key={post.id} className="grid gap-6 rounded-lg overflow-hidden h-full w-full">
                          <BlogCard
                            title={post.title}
                            description={post.description || "Default description"}
                            date={formatDate(post.date) || "Sep 10, 2024"}
                            imageUrl={post.imageURL || "/pic.jpg"}
                            href={post.href || "#"}
                            imgHeight="250px" // Custom image height
                            contentHeight="200px" // Custom content height
                            boxw="100%" // 自定义宽度
                          />
                        </article>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </main>

          <aside className="lg:sticky lg:top-8 top-0 h-fit sm:top-0">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-medium text-gray-500">On this page</h2>
                <h3 className="text-xl font-bold mt-1">Materialx Blog</h3>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Featured</h4>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Latest releases</h4>
                <nav className="space-y-2">
                  {years.map((year) => (
                    <Link
                      key={year}
                      href={`#${year}`}
                      className={`block px-3 py-2 rounded-[24px] text-sm w-[150px] ${
                        activeYear === year
                          ? "border border-[#9A979B] text-[#21182b] font-bold font-google-sans hover:bg-[#ECE9EE] font-variation-grads dark:text-white"
                          : "text-[#736A7A] font-google-sans hover:bg-[#ECE9EE] dark:text-white"
                      }`}
                    >
                      {year}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
