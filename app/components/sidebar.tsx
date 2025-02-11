"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState("Home")
    const [isSearchClicked, setIsSearchClicked] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)  // Track screen size

    const menuItems = [
        { name: "Home", icon: "home", route: "/" },
        { name: "Get started", icon: "apps", route: "/get-started" },
        { name: "Develop", icon: "code", route: "/develop" },
        {
            name: "Foundations", icon: "book", route: "/foundations",
            subItems: [
                { name: "Styles overview", route: "/styles/overview" },
                { name: "Color", route: "/styles/color", hasSubmenu: true },
                { name: "Elevation", route: "/styles/elevation" },
                { name: "Icons", route: "/styles/icons" },
                { name: "Motion", route: "/styles/motion", hasSubmenu: true },
                { name: "Shape", route: "/styles/shape" },
                { name: "Typography", route: "/styles/typography" },
            ],
        },
        {
            name: "Styles",
            icon: "palette",
            route: "/styles",
            subItems: [
                { name: "Styles overview", route: "/styles/overview" },
                { name: "Color", route: "/styles/color", hasSubmenu: true },
                { name: "Elevation", route: "/styles/elevation" },
                { name: "Icons", route: "/styles/icons" },
                { name: "Motion", route: "/styles/motion", hasSubmenu: true },
                { name: "Shape", route: "/styles/shape" },
                { name: "Typography", route: "/styles/typography" },
            ],
        },
        { name: "Components", icon: "add_circle", route: "/components" },
        { name: "Blog", icon: "pages", route: "/blog" },
    ]

    useEffect(() => {
        const currentPath = pathname;

        // 1. Check for exact matches first:
        let activeMenuItem = menuItems.find(item => currentPath === item.route);

        // 2. If no exact match, check for parent route matches (for sub-menus):
        if (!activeMenuItem) {
            activeMenuItem = menuItems.find(item => {
                if (item.subItems) {
                    return item.subItems.some(subItem => currentPath.startsWith(item.route) || currentPath === subItem.route); //startsWith to catch the parent route
                }
                return false;
            });
        }

        // 3. Set activeItem only if a match is found:
        if (activeMenuItem) {
            setActiveItem(activeMenuItem.name);
        } else {
            setActiveItem(''); // Or setActiveItem(""); if you prefer an empty string
        }
    }, [pathname,menuItems])
    {/* Add this useEffect hook */ }
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = 'auto'; // Restore scrolling when component unmounts
        };
    }, [isSidebarOpen]);
    useEffect(() => {
        if (isSearchClicked) {
            setActiveItem("")
        }
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark")
        } else {
            setIsDarkMode(false)
            document.documentElement.classList.remove("dark")
        }

        // Check screen size on load and resize
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768 && window.innerHeight <= 768) // Set for mobile detection (width <= 768px)
        }
        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [isSearchClicked])

    const toggleTheme = (event: React.MouseEvent) => {
        // 停止事件冒泡
        event.stopPropagation();
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
        <div>
            {/* 移动端顶部导航栏 */}
            <div className="md:hidden flex  items-center justify-between p-5 bg-gray-100 dark:bg-[#0F0E0F] bg-[#FFFFFF] fixedz-50 shadow-sm">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`material-symbols-outlined p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                        {isSidebarOpen ? "menu_open" : "menu"}
                    </button>
                    <Link
                        href="/"
                        onClick={() => setIsSearchClicked(true)}
                        className="material-symbols-outlined p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>radio_button_unchecked</span>
                    </Link>

                </div>

                <div className="flex space-x-2">
                    <Link
                        href="/search"
                        onClick={() => setIsSearchClicked(true)}
                        className="material-symbols-outlined p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>search</span>
                    </Link>
                </div>




                {/* 抽屉内容 */}
                <div className={`flex-col fixed top-0 left-0 w-full bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out  h-screen
                ${isSidebarOpen ? "block" : "hidden"}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setIsSidebarOpen(false);
                    }
                }}
                >
                    {/* 侧边栏 */}
                    <div className={`overflow-y-auto fixed top-0 left-0 h-screen w-[320px] bg-[#F2ECEE] dark:bg-[#211F21] shadow-lg transform transition-all duration-300 ease-in-out  rounded-tr-[20px] rounded-br-[20px]
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <div className="p-5">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className={`material-symbols-outlined p-2 rounded-full hover:bg-[#E5DEE2] dark:hover:bg-gray-700 ml-2 mb-4 ${isDarkMode ? "text-white" : "text-black"}`}
                            >
                                {isSidebarOpen ? "menu_open" : "menu"}
                            </button>
                            <nav className="text-left">
                {menuItems.map((item) => (
                    <div key={item.name} className="group relative flex flex-col">
                        <Link
                            href={item.route}
                            onClick={() => {
                                setActiveItem(item.name);
                                setIsSearchClicked(false);
                            }}
                            className={`m-0 flex w-full flex-row items-center gap-1 p-2 section-link mx-auto rounded-[28px] ${activeItem === item.name ? 'bg-[#DCDAF5] dark:bg-[#45455A]' : 'hover:bg-[#E5DEE2] dark:hover:bg-[#2E2B2E]'}`}
                        >
                            <div className={`flex h-[44px] w-[68px] justify-center items-center rounded-full transition-colors ${activeItem === item.name ? '' : 'hover:bg-[#E5DEE2] dark:hover:bg-[#2E2B2E]'}`}>
                                <span className={`material-symbols-outlined ${isDarkMode ? 'text-white' : 'text-black'} text-xl`}>
                                    {item.icon}
                                </span>
                            </div>
                            <span className={`text-black dark:text-white ${activeItem === item.name ? 'font-bold' : ''}`}>
                                {item.name}
                            </span>
                        </Link>
                    </div>
                ))}
            </nav>





                        </div>
                        <div className="bottom-0 w-full flex justify-center pb-6 safe-area-inset-bottom" style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 24px)` }}> {/* Dynamic padding */}
                            <button
                                onClick={toggleTheme}
                                className={`rounded-[32px] flex h-16 w-60 items-center justify-center gap-2 transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] px-6 py-2 border ${isDarkMode
                                    ? "bg-[#2E2C2E] hover:bg-[#45455A] text-white border-gray-700 dark:border-gray-300"
                                    : "bg-[#E5DEE2] hover:bg-[#DCDAF5] text-black border-gray-300 dark:border-gray-700"
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>
                                    {isDarkMode ? "light_mode" : "dark_mode"}
                                </span>
                                <span className="text-sm md:text-base lg:text-lg">
                                    {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                                </span>
                            </button>
                        </div>


                    </div>

                </div>

            </div>


            <aside className="md:overflow-y-auto flex inset-y-0 h-full w-[98px] flex-col items-center bg-[#F2ECEE] py-4 dark:bg-[#211F21] fixed hidden md:flex">


                {/* Search Icon */}
                <Link
                    href="/search"
                    onClick={() => setIsSearchClicked(true)}
                    className="mb-2 mt-1 flex h-[62px] w-[62px] items-center justify-center rounded-[16px] bg-[#F1D3F9] dark:bg-[#553f5d]"
                >
                    <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>search</span>
                </Link>

                {/* Navigation Items */}
                <div className="w-full">
                    {menuItems.map((item) => (
                        <div key={item.name} className="group relative flex flex-col items-center">
                            {/* Main Menu Item */}
                            <Link
                                href={item.route}
                                onClick={() => {
                                    setActiveItem(item.name);
                                    setIsSearchClicked(false);
                                }}
                                className="mb-2 flex w-full flex-col items-center gap-1 p-2 text-center section-link my-[14px] mx-auto -mt-[2px]"
                            >
                                <div
                                    className={`flex h-[38px] w-[62px] items-center justify-center rounded-full  active ${isSearchClicked || activeItem !== item.name
                                        ? "hover:bg-[#E5DEE2] bg-transparent dark:hover:bg-[#2E2B2E]"
                                        : " bg-[#DCDAF5] dark:bg-[#45455A]"}`}
                                >
                                    <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>
                                        {item.icon}
                                    </span>
                                </div>
                                <span className="text-xs dark:text-white">{item.name}</span>
                            </Link>

                            {/* Submenu */}
                            {item.subItems && (
                                <div className="invisible fixed left-[96px] top-0 min-w-[240px] bg-[--item-bg] dark:bg-[#211F21] rounded-tr-[20px] rounded-br-[20px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 py-2 h-screen border-l-2 dark:border-[#483E51] border-[#E8E0E8] group-hover:shadow-[4px_0px_8px_rgba(1,0,0,0.1)]">
                                    {item.subItems.map((subItem) => (
                                        <Link
                                            key={subItem.name}
                                            href={subItem.route}
                                            className={`flex h-[40px] items-center justify-between px-6 hover:bg-[#E5DEE2] rounded-[24px] ml-2 mr-2
                                        dark:hover:bg-[#2E2B2E] ${pathname === subItem.route ? "bg-[#e7dff8] dark:bg-[#45455A]" : ""}
                                        ${isDarkMode ? "text-white" : "text-black"}`}
                                        >
                                            <span className="text-[14px]">{subItem.name}</span>
                                            {subItem.hasSubmenu && (
                                                <span
                                                    className={`material-symbols-outlined text-sm ${isDarkMode ? "text-white/60" : "text-black/60"}`}
                                                >
                                                   arrow_drop_down
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Theme Toggle - Fixed at Bottom */}
                <button
                    onClick={toggleTheme}
                   className="rounded-[32px] mb-5 mt-auto flex h-10 w-10 items-center justify-center hover:bg-[#E5DEE2] dark:hover:bg-[#2E2C2E] border-2 outline outline-[1px] outline-[var(--theme-color-utility-outline)] transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] h-[2.5rem] w-[2.5rem]"
                >
                    <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>
                        {isDarkMode ? "light_mode" : "dark_mode"}
                    </span>
                </button>
            </aside>
        </div>

    )
}
