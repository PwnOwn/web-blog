'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter, FaLink } from "react-icons/fa";

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
            console.log("Subsections:", subsections); // 调试输出
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
            threshold: 0.5, // 多个阈值
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
        const id = subsection.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""); // 保证格式一致
        setActiveSubsection(id);
       

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            console.error(`Element with ID ${id} not found`);
        }
    };


    return (
        <aside className="h-fit sm:top-0 w-full lg:w-[157px] w- dark:text-white w-[156px] mt-[112px] mx-6">
            <div className="space-y-8">
                <div className="space-y-2 ">
                    <h2 className="text-sm font-medium text-gray-500 font-google-sans dark:text-white mt-0 mx-4 mb-2">On this page</h2>
                    <h3 className="text-xl font-google-sans  dark:text-white break-words mt-0 mx-4 mb-2 text-[25px]">{title}</h3>
                </div>

                <div className="space-y-2 mr-2">
                    <nav className="space-y-2">
                        {subsections.map((subsection) => {
                            const id = subsection.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""); // 保证格式一致
                    
                            return (
                                <Link
                                    key={subsection}
                                    href={`#${id}`}
                                    onClick={() => handleClick(subsection)}
                                    id={id}
                                    className={`block px-3 py-2 rounded-[24px] text-sm w-[150px] ${id === activeSubsection
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
                    <h4 className="text-sm font-medium mt-0 mx-4 mb-2">Share on</h4>
                    <div className="flex space-x-3 mt-0 mx-4 mb-2">
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