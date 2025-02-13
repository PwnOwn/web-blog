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

// 从数据库中获取指定 href 的帖子
async function getPostFromDatabaseByHref(href: string): Promise<Post | null> {
  try {
    const result = await pool.query(
      'SELECT id, title, description, date, imageURL, year, href FROM posts WHERE href = $1;',
      [href]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// 定义 API 路由处理函数
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // 解析请求 URL 以获取 href 参数
    const url = new URL(request.url);
    const href = url.pathname.split('/').pop() || '';

    const post = await getPostFromDatabaseByHref(href);

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
