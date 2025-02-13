import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// 创建一个 PostgreSQL 连接池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://neondb_owner:npg_hsN4QCwAIa5V@ep-lively-field-a1bbnr6b-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
});

// 监听连接池错误
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

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

// 从数据库中获取所有帖子
async function getAllPostsFromDatabase(): Promise<Post[]> {
  try {
    const result = await pool.query('SELECT id, title, description, date, imageURL, year, href FROM posts;');
    return result.rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// 定义 API 路由处理函数
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const posts = await getAllPostsFromDatabase();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
