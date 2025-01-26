import * as Blog from '@/features/blog/index';
import * as Elements from '@/app/components/elements/index';
import { getAllPosts } from "@/lib/post";

const BlogListPage = async () => {
    const posts = await getAllPosts();
    const tags = Array.from(new Set(posts.flatMap(post => post.tags))).filter((tag): tag is string => tag !== undefined);

    return (
        <>
            <Elements.LeftContainer />
            <Elements.CenterContainer>
                <h1 className='text-center'>ブログ一覧</h1>
                <Elements.Tags tags={tags} />
                <Blog.DisplayPosts />
            </Elements.CenterContainer>
            <Elements.RightContainer />
        </>
    );
}

export default BlogListPage;
