"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import BlogCard from "../components/ui/blog-card"
import Pagehader from "../components/pagehader"
import MaterialDesignHero from "../components/pagehader"
const blogPosts = [
  {
    id: 1,
    title: "Material Design for XR (Developer Preview)",
    description: "Building UI that adapts for XR with familiar frameworks and tools",
    date: "Dec 12, 2024",
    image: "/404.png",
    year: 2024,
  },
  {
    id: 2,
    title: "Unlocking component flexibility with slots in Figma",
    description: 'One less reason to "detach instance"',
    date: "Nov 04, 2024",
    image: "/404.png",
    year: 2018,
  },
  {
    id: 3,
    title: "Unlocking component flexibility with slots in Figma",
    description: 'One less reason to "detach instance"',
    date: "Nov 04, 2019",
    image: "/404.png",
    year: 2019,
  },
  {
    id: 4,
    title: "Unlocking component flexibility with slots in Figma",
    description: 'One less reason to "detach instance"',
    date: "Nov 04, 2019",
    image: "/404.png",
    year: 2021,
  },
  {
    id: 5,
    title: "Unlocking component flexibility with slots in Figma",
    description: 'One less reason to "detach instance"',
    date: "Nov 04, 2019",
    image: "/404.png",
    year: 2023,
  },
  {
    id: 6,
    title: "Unlocking component flexibility with slots in Figma",
    description: 'One less reason to "detach instance"',
    date: "Nov 04, 2019",
    image: "/404.png",
    year: 2022,
  },
  {
    id: 7,
    title: "Unlocking component flexibility with slots in Figma",
    description: 'One less reason to "detach instance"',
    date: "Nov 04, 2019",
    image: "/404.png",
    year: 2020,
  },

]

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018]

export default function BlogPage() {
  const [activeYear, setActiveYear] = useState(2024)

  // Change here: Ensure the ref is typed correctly.
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = parseInt(entry.target.id)
          setActiveYear(year)
        }
      })
    },
    [],
  )

  useEffect(() => {
    const observers = years.map((year) => {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      })

      // Ensure the ref is assigned and used properly here.
      if (yearRefs.current[year]) {
        observer.observe(yearRefs.current[year]!)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [handleIntersection])

  return (
    <div className="dark:text-white">
      <MaterialDesignHero
      videoUrl="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
      date="Dec 16, 2020"
      title="The State of Design Systems: 2020"
      description="A community survey of design systems, from creation to implementation and beyond"

    />
      <div className="max-w-7xl mx-auto px-4 sm:px-6  py-12">

        <div className="grid  lg:grid-cols-[1fr,300px] gap-12">
          <main className="m-auto">
            <h1 className="text-5xl font-bold mb-16">All blog posts</h1>

            {years.map((year) => (
              <div
                key={year}
                id={String(year)} // Ensure each year section has a unique id for IntersectionObserver to track
                ref={(el) => {
                  // Use optional chaining to ensure `el` is assigned correctly
                  if (el) yearRefs.current[year] = el
                }} // Correctly assign the ref
              >
                <h2 className="text-3xl font-bold mb-8">{year}</h2>
                {blogPosts.filter((post) => post.year === year).length === 0 ? (
                  <p>No blog posts for this year.</p>
                ) : (
                  <div className="grid grid-cols-2  gap-[8px] mb-3 ">
                    {blogPosts
                      .filter((post) => post.year === year)
                      .map((post) => (
                        <article key={post.id} className="grid gap-6  rounded-lg overflow-hidden h-[510px] ">

                          <BlogCard
                            title="Material Design 3 for Compose version 1.3"
                            description="Exploring the 1.3 release of Material Design 3 for Compose"
                            date="Sep 10, 2024"
                            imageUrl="/pic.jpg"
                            href="#"
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
                      className={`block px-3 py-2 rounded-[24px]  text-sm w-[150px] ${activeYear === year ? "border border-[#9A979B]  text-[#21182b] font-bold font-google-sans hover:bg-[#ECE9EE] font-variation-grads" : " text-[#736A7A] font-google-sans hover:bg-[#ECE9EE]"}`}
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

  )
}
