import * as Blog from '@/features/blog/index';

export default async function BlogListPage() {
    return (
        <div>
            <h1 className='text-center'>ブログ一覧</h1>
            <Blog.DisplayPosts />
        </div>
    );
};
