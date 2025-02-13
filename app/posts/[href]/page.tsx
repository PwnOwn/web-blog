'use client'; // 确保这行在文件顶部

import MaterialDesignHero from "@/app/components/pagehader";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
  imageURL: string;
  year: number;
  href: string;
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const extractedHref = pathname.split('/').pop() || null; // 使用默认值 null
      setHref(extractedHref);
    }
  }, []);

  useEffect(() => {
    if (!href) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${href}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`);
        }
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [href]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  if (isLoading) return <div>Loading...</div>;
  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="post-detail">
      <MaterialDesignHero
          videoUrl="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
          date={formatDate(post.date)}
          title={ post.title }
          description={post.description}
          titleSize="text-[48px] md:text-[64px]" // 自定义标题大小
        />
      
    </div>
  );
}
