"use client"
import { useEffect, useState } from "react";
import MaterialDesignHero from "./components/pagehader";
import BlogCard from "./components/ui/blog-card";
import { Link } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  imageURL: string;
  href: string;
}
const resources = [
  {
    title: 'Material blog',
    description: 'News, tutorials, and inspiration from the Material team',
    link: '/blog', // Replace with your actual link
  },
  {
    title: 'Figma M3 Design Kit',
    description: 'Customizable styles and components to help you design with Material',
    link: '/figma', // Replace with your actual link
  },
  {
    title: 'Get started',
    description: 'Guides, videos, and tools to start building with Material',
    link: '/get-started', // Replace with your actual link
  },
  {
    title: 'Develop',
    description: 'Code and developer documentation for building with Material',
    link: '/develop', // Replace with your actual link
  },
];
export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Fetch the latest 3 blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog-posts"); // Assume your API route for fetching the latest blogs
        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await res.json();
        setPosts(data.posts); // Assuming data.posts is an array of the latest blog posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="bg-[--light-bg] dark:bg-[#141314] text-black dark:text-white h-full">
      <div className="relative z-10">
        <MaterialDesignHero
          videoUrl="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
          date=""
          title="Q Blog"
          description="A community survey of design systems, from creation to implementation and beyond"
          titleSize="text-[48px] md:text-[64px]" // 自定义标题大小
        />
      </div>

      <div className="w-full max-w-[1200px] p-2">
        <div className="my-24 mx-auto ">
          <h2 className="font-google-sans text-[57px] mb:text-[24px] m-24 mx-auto md:ml-[260px]">
            News &amp; launches
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[8px] mb-3 w-full mx-auto  md:ml-[265px] ">
            {/* Map through the latest 3 blog posts and render them */}
            {posts.slice(0, 3).map((post) => (
              <article key={post.id} className="rounded-[24px] overflow-hidden h-[350px] w-full dark:bg-[#1C1B1D] dark:hover:bg-[#45455A]">
                <div className="gap-6 h-full w-full ">
                  <BlogCard
                    title={post.title}
                    description={post.description || "Default description"}
                    date={''}
                    imageUrl={post.imageURL || "/bg.jpg"}
                    href={post.href || "#"}
                  />
                </div>

              </article>
            ))}
          </div>
          <div className="p-2">
            <h2 className="font-google-sans text-[40px] md:text-[57px] mb-12 md:mb-24 mx-auto md:ml-[260px] font-bold">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto md:ml-[260px] w-full max-w-[1450px]"> {/* Added max-w for responsiveness */}
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="bg-[--mio-theme-color-surface-1] dark:bg-[#1C1B1D] dark:hover:bg-[#45455A] p-6 rounded-[24px] hover:bg-[--there-hover-coloer] transition duration-300 ease-in-out" // Added styling and hover effect
                >
                  <h3 className="text-xl font-semibold mb-2 font-google-sans">{resource.title}</h3>
                  <p className="font-google-sans">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>

  );
}
