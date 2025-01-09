import { getAllPosts, getPostBySlug } from "@/lib/post";
import * as Blog from '@/features/blog/index';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post(props: { params: Promise<{ slug: string}> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return <div>記事が見つかりませんでした。</div>
    }

    return (
        <main>
            <Blog.Article
                title={post.title}
                date={post.date}
                content={post.content}
            />
        </main>
    );
}