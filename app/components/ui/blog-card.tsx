
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "./card"
import { useEffect, useState } from "react";
interface BlogCardProps {
    title: string
    description: string
    date: string
    imageUrl: string
    href: string
}

export default function BlogCard({ title, description, date, imageUrl, href }: BlogCardProps) {
    return (
        <Link href={`/posts/${href}`}>
            <Card className="overflow-hidden flex flex-col h-full w-full box-content rounded-[24px]">
                {/* Image section */}
                <div className="relative h-[200px] w-full bg-[#F8F1F6] rounded-[24px]">
                    <Image src={imageUrl} alt={title} layout="fill" className="object-cover rounded-[24px]" priority />
                </div>

                {/* Card content section */}
                <CardContent className="p-6 flex flex-col gap-4 h-[10px]"> {/* Adjust height here */}
                    <time className="text-sm text-muted-foreground">{date}</time>
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <p className="text-muted-foreground">{description}</p>
                </CardContent>
            </Card>

        </Link>
    )
}
