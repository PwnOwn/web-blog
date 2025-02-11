"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState("Home")
    const [isSearchClicked, setIsSearchClicked] = useState(false) // State to track if search is clicked
    const [isDarkMode, setIsDarkMode] = useState(false);


    const menuItems = [
        { name: "Home", icon: "home", route: "/" },
        { name: "Get started", icon: "apps", route: "/get-started" },
        { name: "Develop", icon: "code", route: "/develop" },
        { name: "Foundations", icon: "book", route: "/foundations" },
        { name: "Styles", icon: "palette", route: "/styles" },
        { name: "about", icon: "add_circle", route: "/about" },
        { name: "Blog", icon: "pages", route: "/blog" },
    ]

    // Reset active item to "Home" when search is clicked
    useEffect(() => {
        if (isSearchClicked) {
            setActiveItem("") // Clear active item when search is clicked
        }
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark"); // 添加 dark 类
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark"); // 移除 dark 类
        }
    }, [isSearchClicked])

    // Toggle theme and save to localStorage
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            return newMode;
        });
    };

      

    return (
        <aside className="flex h-screen w-[86px] flex-col items-center bg-[#fdf7f9] py-4 dark:bg-[#211F21] fixed">
            {/* Search Icon */}
            <Link
                href="/search"
                onClick={() => setIsSearchClicked(true)} // Set isSearchClicked to true when search is clicked
                className="mb-2 flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-[#F1D3F9] dark:bg-[#553f5d]"
            >
                <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"
                            }`}>search</span>
            </Link>

            {/* Navigation Items */}
            {menuItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.route}
                    onClick={() => {
                        setActiveItem(item.name) // Set active item when a menu item is clicked
                        setIsSearchClicked(false) // Reset search click state
                    }}
                    className="mb-2 flex w-full flex-col items-center gap-1 p-2 text-center section-link my-[14px] mx-auto -mt-[2px]"
                >
                    <div
                        className={`flex h-[32px] w-[56px] items-center justify-center rounded-full transition-colors active hover:bg-[#E5DEE2] ${isSearchClicked || activeItem !== item.name
                            ? "bg-transparent dark:hover:bg-[#2E2B2E]" // No background if search is clicked or it's not the active item
                            : "bg-[#e7dff8]  dark:bg-[#45455A]" // Apply background when it's the active item
                            }`}
                    >
                        <span id="icon" className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"
                            }`}
                        >
                            {item.icon}
                        </span>
                    </div>
                    <span className="text-xs dark:text-white">{item.name}</span>
                </Link>
            ))}

            {/* Theme Toggle - Fixed at Bottom */}
            <button
                onClick={toggleTheme} // Add the onClick to toggle the theme
                className="rounded-[32px] mt-auto flex h-10 w-10 items-center justify-center hover:bg-[#E5DEE2] dark:hover:bg-[#2E2C2E] border-2 outline outline-[1px] outline-[var(--theme-color-utility-outline)] transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
            >
                <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"
                    }`}>
                    {isDarkMode ? "light_mode" : "dark_mode"}
                </span>
            </button>
        </aside>
    )
}
