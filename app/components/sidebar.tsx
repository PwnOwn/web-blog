"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState("Home")
    const [isSearchClicked, setIsSearchClicked] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const pathname = usePathname()

    const menuItems = [
        { name: "Home", icon: "home", route: "/" },
        { name: "Get started", icon: "apps", route: "/get-started" },
        { name: "Develop", icon: "code", route: "/develop" },
        { name: "Foundations", icon: "book", route: "/foundations",
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
        const currentPath = pathname
        const activeMenuItem = menuItems.find(
            (item) => currentPath === item.route || item.subItems?.some((subItem) => currentPath === subItem.route),
        )
        if (activeMenuItem) {
            setActiveItem(activeMenuItem.name)
        }
    }, [pathname])

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
    }, [isSearchClicked])

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode
            if (newMode) {
                document.documentElement.classList.add("dark")
                localStorage.setItem("theme", "dark")
            } else {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("theme", "light")
            }
            return newMode
        })
    }

    return (
        <aside className="flex h-screen w-[98px] flex-col items-center bg-[#F2ECEE] py-4 dark:bg-[#211F21] fixed">
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
                                setActiveItem(item.name)
                                setIsSearchClicked(false)
                            }}
                            className="mb-2 flex w-full flex-col items-center gap-1 p-2 text-center section-link my-[14px] mx-auto -mt-[2px]"
                        >
                            <div
                                className={`flex h-[38px] w-[62px] items-center justify-center rounded-full transition-colors active hover:bg-[#E5DEE2] ${isSearchClicked || activeItem !== item.name
                                    ? "bg-transparent dark:hover:bg-[#2E2B2E]"
                                    : "bg-[#DCDAF5] dark:bg-[#45455A]"}`}
                            >
                                <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>
                                    {item.icon}
                                </span>
                            </div>
                            <span className="text-xs dark:text-white">{item.name}</span>
                        </Link>

                        {/* Submenu */}
                        {item.subItems && (
                             <div className="invisible fixed left-[86px] top-0 min-w-[240px] bg-[--item-bg] dark:bg-[#211F21] rounded-tr-[24px] rounded-br-[24px]  opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 py-2 h-screen border-l-2 dark:border-[#483E51] border-[#E8E0E8]">
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
                                                expand_more
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
                className="rounded-[32px] mt-auto flex h-10 w-10 items-center justify-center hover:bg-[#E5DEE2] dark:hover:bg-[#2E2C2E] border-2 outline outline-[1px] outline-[var(--theme-color-utility-outline)] transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
            >
                <span className={`material-symbols-outlined ${isDarkMode ? "text-white" : "text-black"}`}>
                    {isDarkMode ? "light_mode" : "dark_mode"}
                </span>
            </button>
        </aside>
    )
}
