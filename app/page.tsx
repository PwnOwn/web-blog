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
      <div className="z-10">
        <MaterialDesignHero
          videoUrl="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
          date=""
          title="Q Blog"
          description="A community survey of design systems, from creation to implementation and beyond"
          titleSize="text-[48px] md:text-[64px]" // 自定义标题大小
        />
      </div>

      <div className="p-2 max-w-7xl mx-auto">
        <div className="my-24 mx-auto">
          <h2 className="font-google-sans text-[57px] mb:text-[24px] mx-auto  text-center md:text-left">
            News &amp; Launches
          </h2>

          <div className="grid grid-cols-1 gap-[8px] mb-3 w-full mx-auto md:grid-cols-2 lg:grid-cols-3 max-md:grid-cols-2">
            {/* Map through the latest 3 blog posts and render them */}
            {posts.slice(0, 3).map((post) => (
              <article key={post.id} className="rounded-[24px] overflow-hidden h-[350px] w-full">
                <div className="gap-6 h-full w-full">
                  <BlogCard
                    title={post.title}
                    description={post.description || "Default description"}
                    date={''}
                    imageUrl={post.imageURL || "/bg.jpg"}
                    href={post.href || "#"}
                    imgHeight="180px" // Custom image height
                    contentHeight="200px" // Custom content height
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="p-2 mx-auto">
            <h2 className="font-google-sans text-[40px] md:text-[57px] mb-12 md:mb-24 mx-auto font-bold text-center md:text-left">
              Resources
            </h2>
            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 gap-2 mx-auto w-full max-w-[1450px] md:ml-0 md:mr-0">
              {/* Added max-w for responsiveness */}
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="bg-[--mio-theme-color-surface-1] dark:bg-[#1C1B1D] dark:hover:bg-[#45455A] p-6 rounded-[24px] hover:bg-[--there-hover-coloer] transition duration-300 ease-in-out"
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
