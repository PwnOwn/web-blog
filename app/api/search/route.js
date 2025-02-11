import { Route } from "lucide-react";

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

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query) {
        return new Response(JSON.stringify({ results: [] }), { status: 200 });
    }

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
    );

    return new Response(JSON.stringify({ results: filteredPosts }), { status: 200 });
}