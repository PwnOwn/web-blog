import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://shop_owner:rIePn6YCDz3O@ep-wandering-pond-a157diml-pooler.ap-southeast-1.aws.neon.tech/blog?sslmode=require'
});

async function getPostsFromDatabase(query: string) {  // Add type annotation
    try {
        const result = await pool.query(
            'SELECT id, title, route FROM posts WHERE LOWER(title) LIKE LOWER($1)', // Include id in the SELECT
            [`%${query}%`]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function GET(request: Request) {  // Add type annotation
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query) {
        return NextResponse.json({ results: [] }, { status: 200 });
    }

    try {
        const filteredPosts = await getPostsFromDatabase(query);
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