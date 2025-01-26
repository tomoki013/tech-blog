import { getAllPosts, getPostBySlug } from "@/lib/post";
import * as Blog from '@/features/blog/index';
import * as Elements from '@/app/components/elements/index';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

export default async function Post(props: { params: Promise<{ slug: string}> }) {
    const params = await props.params;
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return <div>記事が見つかりませんでした。</div>
    }

    return (
        <>
            <Elements.LeftContainer />
            <Elements.CenterContainer>
                <div className="p-2 bg-[var(--accent-color)] rounded border border-[var(--reverse-color)] text-black">この記事は<span className='border-b-2 border-red-600'>{formatDate(post.date)}</span>に書かれたものです。古い情報が含まれている可能性がありますのでお気を付けください。</div>
                <Blog.Article
                    title={post.title}
                    date={post.date}
                    content={post.content}
                    tags={post.tags || []}
                />
            </Elements.CenterContainer>
            <Elements.RightContainer>
                {/* <Blog.Index /> */}
            </Elements.RightContainer>
        </>
    );
}