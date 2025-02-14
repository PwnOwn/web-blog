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
  subsections: string[]; // List of subsections (small titles)
}

// 从文件中读取指定 href 的帖子
async function getPostFromFileByHref(href: string): Promise<Post | null> {
  try {
    // 文件路径，确保数据文件在正确的目录
    const filePath = path.join(process.cwd(), 'app', 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const posts: Post[] = JSON.parse(fileContent);

    // 根据 href 查找帖子
    const post = posts.find(p => p.href === href);
    return post || null;
  } catch (error) {
    console.error('Error reading posts file:', error);
    return null;
  }
}

// 定义 API 路由处理函数
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // 解析请求 URL 以获取 href 参数
    const url = new URL(request.url);
    const href = url.pathname.split('/').pop() || '';

    const post = await getPostFromFileByHref(href);

    if (post) {
      return NextResponse.json({ post }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
