import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://neondb_owner:npg_hsN4QCwAIa5V@ep-lively-field-a1bbnr6b-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

interface Post {
    id: number;
    title: string;
    href: string;
}

async function getPostFromDatabaseByHref(href: string): Promise<Post | null> {
    try {
        console.log('Executing query:', 'SELECT id, title, description, date, imageURL, year, href FROM posts WHERE href = $1;', [href]);
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

export async function GET(request: Request, { params }: { params: { href: string } }): Promise<NextResponse> {
    try {
        console.log('Params:', params);
        const href = params.href; // 直接访问，不需要 await

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