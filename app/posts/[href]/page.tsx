"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import BlogPageSidebar from "@/app/components/BlogPageSidebar"
import MaterialDesignHero from "@/app/components/pagehader"

interface Author {
  name: string
  title: string
  avatar: string
}

interface ContentSection {
  id: string
  title: string
  content: string
  imageUrl?: string
  links?: Array<{ text: string; url: string }>
}

interface Post {
  author: Author
  id: number
  title: string
  description: string
  date: string
  imageURL: string
  year: number
  href: string
  subsections: string[]
  content: ContentSection[]
  tags: string[]
  readTime: string
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [href, setHref] = useState<string | null>(null)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname
      const extractedHref = pathname.split("/").pop() || null
      setHref(extractedHref)
    }
  }, [])

  useEffect(() => {
    if (!href) return

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${href}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`)
        }
        const data = await res.json()
        setPost(data.post)
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [href])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (!post) {
    return null
  }
  const handleCopyLink = async (sectionId: string) => {
    const url = `${window.location.href.split("#")[0]}#${sectionId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedSection(sectionId)
      setTimeout(() => setCopiedSection(null), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy link", err)
    }
  }
  return (
    <div className="post-detail">
      <MaterialDesignHero
        videoUrl="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
        date={formatDate(post.date)}
        title={post.title}
        description={post.description}
        titleSize="text-[48px] md:text-[64px]"
      />

      <div className="md:max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-[1fr,300px] gap-12">
          <main className="w-full">
            <div className="mb-8 border-b pb-6">
              <div className="text-sm text-gray-600 mb-4">Posted by</div>
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium text-lg">{post.author.name}</h3>
                  <p className="text-gray-600 text-sm">{post.author.title}</p>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
            <p className="text-lg">{post.description}</p>

            {post.content && post.content.length > 0 ? (
              post.content.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2 className="text-3xl font-bold mt-8">{section.title}</h2>
                  <p className="mt-4">{section.content}</p>
                  {section.imageUrl && (
                    <Image
                      src={section.imageUrl}
                      alt={section.title}
                      width={800}
                      height={400}
                      className="mt-4 rounded-lg"
                    />
                  )}
                  {section.links && section.links.length > 0 && (
                    <div className="mt-4">
                      {section.links.map((link, index) => (
                        <a key={index} href={link.url} className="text-blue-600 hover:underline block">
                          {link.text}
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              ))
            ) : (
              <p>No content available.</p>
            )}
          </main>

          <aside className="lg:sticky lg:top-8 top-8 h-fit sm:top-0">
            <BlogPageSidebar title={post.title} subsections={post.content.map((section) => section.title)} />
              
          </aside>
        </div>
      </div>
    </div>
  )
}

