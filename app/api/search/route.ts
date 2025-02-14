import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 定义 Post 接口
interface Post {
    id: number;
    title: string;
    description: string;
    date: string;
    imageURL: string;
    year: number;
    href: string;
  }

// 从 app/data.json 文件中读取数据
async function getPostsFromFile(query: string): Promise<Post[]> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data.json'); // 确保 data.json 存放在 app 文件夹中
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const posts: Post[] = JSON.parse(fileContent); // 解析 JSON 数据

    // 根据标题进行模糊匹配
    return posts.filter((post: Post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching posts from file:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query) {
    return NextResponse.json({ results: [] }, { status: 200 });
  }

  try {
    const filteredPosts = await getPostsFromFile(query);
    return NextResponse.json({ results: filteredPosts }, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}


const posts = [
    { id: 1, title: 'Accessibility', Route: '/Accessibility' },
    { id: 2, title: 'Content design',Route: '/Accessibility' },
    { id: 3, title: 'Notifications',Route: '/Accessibility' },
    { id: 4, title: 'Customizing Material',Route: '/Accessibility' },
    { id: 5, title: 'Interaction',Route: '/Accessibility' },
    { id: 6, title: 'Selection',Route: '/Accessibility' },
    { id: 7, title: 'Layout basics',Route: '/Accessibility' },
    { id: 8, title: 'MDC-Android',Route: '/Accessibility' },
    { id: 9, title: 'Jetpack compose',Route: '/Accessibility' },
    { id: 10, title: 'Accessibility', Route: '/Accessibility' },
    { id: 22, title: 'Content design',Route: '/Accessibility' },
    { id: 32, title: 'Notifications',Route: '/Accessibility' },
    { id: 42, title: 'Customizing Material',Route: '/Accessibility' },
    { id: 52, title: 'Interaction',Route: '/Accessibility' },
    { id: 62, title: 'Selection',Route: '/Accessibility' },
    { id: 72, title: 'Layout basics',Route: '/Accessibility' },
    { id: 82, title: 'MDC-Android',Route: '/Accessibility' },
    { id: 92, title: 'Jetpack compose',Route: '/Accessibility' },
];