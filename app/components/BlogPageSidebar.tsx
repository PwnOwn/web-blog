'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter,FaLink } from "react-icons/fa";

interface PageSidebarProps {
  title: string;
  subsections: string[];
}

const BlogPageSidebar = ({ title, subsections = [] }: PageSidebarProps) => {
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
 // 处理点击复制链接的功能
 const handleCopyLink = (subsection: string) => {
    const id = subsection.toLowerCase().replace(/\s+/g, "-");
    const url = window.location.href.split("#")[0] + "#" + id;

    // 使用 Clipboard API 来复制链接
    navigator.clipboard.writeText(url).then(() => {
      alert(`链接已复制: ${url}`);
    }).catch((err) => {
      console.error("复制失败", err);
    });
  };
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let mostIntersected: string | null = null;
      let maxIntersectionRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio;
          mostIntersected = entry.target.id;
        }
      });

      if (mostIntersected) {
        setActiveSubsection(mostIntersected);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.25, 0.5, 0.75, 1], // 多个阈值
    });

    subsections.forEach((subsection) => {
      const id = subsection.toLowerCase().replace(/\s+/g, "-");
      const element = document.getElementById(id); // Get element by ID

      if (element) {
        sectionRefs.current[subsection] = element; // 存储 ref
        observer.observe(element);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((element) => { // 取消观察所有元素
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect(); // 断开观察者
    };
  }, [subsections]);

  const handleClick = (subsection: string) => {
    // 格式化 ID
    const id = subsection.toLowerCase().replace(/\s+/g, "-");
    
    // 更新 activeSubsection 状态
    setActiveSubsection(id);
  
    // 获取要滚动到的元素
    const element = document.getElementById(id);
    
    // 检查元素是否存在，并且在元素存在时执行滚动
    if (element) {
      console.log(`Scrolling to: ${id}`);  // Log for debugging
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error(`Element with ID ${id} not found`);  // Log error if element is not found
    }
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);  // Delay for 300ms, adjust as needed
  };
  

  return (
    <aside className="lg:sticky lg:top-8 top-0 h-fit sm:top-0 w-full lg:w-[300px] dark:text-white">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-gray-500 font-google-sans dark:text-white">On this page</h2>
          <h3 className="text-xl font-bold mt-1 dark:text-white">{title}</h3>
        </div>

        <div className="space-y-2">
          <nav className="space-y-2">
            {subsections.map((subsection) => {
              const id = subsection.toLowerCase().replace(/\s+/g, "-"); // 一致的 ID
              
              return (
                
                <Link
                  key={subsection} // key 属性
                  href={`#${id}`} // 修改这里，去掉 #
                  onClick={() => handleClick(subsection)}
                  id={id} // 在 Link 上设置 ID
                  className={`block px-3 py-2 rounded-[24px] text-sm w-[150px] ${
                    id === activeSubsection // 与 ID 比较
                      ? "border border-[#9A979B] text-[#21182b] font-bold dark:text-white font-google-sans hover:bg-[#ECE9EE] font-variation-grads"
                      : "text-[#736A7A] font-google-sans dark:text-white hover:bg-[#ECE9EE]"
                  }`}
                >
                  {subsection}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Share on</h4>
          <div className="flex space-x-3">
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-800">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogPageSidebar;