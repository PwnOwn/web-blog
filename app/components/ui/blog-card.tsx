import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./card";
import { useEffect, useState } from "react";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  href: string;
  imgHeight?: string; // Optional height for the image
  contentHeight?: string; // Optional height for the content section
  boxw?: string; // Optional width for the card
}

export default function BlogCard({
  title,
  description,
  date,
  imageUrl,
  href,
  imgHeight = "200px", // Default image height
  contentHeight = "auto", // Default content height
  boxw = "100%", // Default width
}: BlogCardProps) {
  return (
    <Link href={`/posts/${href}`}>
      <Card
        className="overflow-hidden flex flex-col h-full w-full box-content rounded-[24px]"
        style={{ width: boxw }} // Set width of the card
      >
        {/* Image section */}
        <div
          className="relative w-full bg-[#F8F1F6] rounded-[24px]"
          style={{ height: imgHeight, minHeight: imgHeight }} // Ensure height is correctly set
        >
          <Image
            src={imageUrl}
            alt={title}
            layout="fill" // This will make the image fill the entire parent div
            className="object-cover rounded-[24px] mx-auto"
            priority
          />
        </div>

        {/* Card content section */}
        <CardContent
          className="p-6 flex flex-col gap-4"
          style={{ height: contentHeight }}
        >
          <time className="text-sm text-muted-foreground">{date}</time>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
