import * as Blog from '@/features/blog/index';

export default async function BlogListPage() {
    return (
        <main>
            <h1>ブログ一覧</h1>
			<Blog.DisplayPosts />
        </main>
    );
};
