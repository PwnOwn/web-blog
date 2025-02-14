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

// 从文件中读取所有帖子
async function getAllPostsFromFile(): Promise<Post[]> {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data.json'); // 确保 posts.json 存放在正确的目录
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const posts: Post[] = JSON.parse(fileContent);
    return posts;
  } catch (error) {
    console.error('Error reading posts file:', error);
    return [];
  }
}

// 定义 API 路由处理函数
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const posts = await getAllPostsFromFile();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
