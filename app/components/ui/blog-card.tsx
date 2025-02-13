
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "./card"

interface BlogCardProps {
    title: string
    description: string
    date: string
    imageUrl: string
    href: string
}

export default function BlogCard({ title, description, date, imageUrl, href }: BlogCardProps) {
    return (
        <Link href={href}>
            <Card className="overflow-hidden flex h-full w-auto box-content rounded-[24px]" >
                {/* 图片和文字上下排列 */}
                <div className="flex flex-col h-full w-full ">
                    <div className="relative h-full bg-emerald-800 w-full">
                        <Image src={imageUrl || "/placeholder.svg"} alt="" fill className="object-cover" priority />
                    </div>
                    <CardContent className="p-6 grid relative self-start min-w-[calc(100%-48px)]  gap-2 ">
                        <div className="space-y-4">
                            <time className="text-sm text-muted-foreground">{date}</time>
                            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                            <p className="text-muted-foreground">{description}</p>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </Link>

    )
}

