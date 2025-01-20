import * as Elements from '@/app/components/elements/index';
import * as Blog from '@/features/blog/index';
import { getAllPosts } from '@/lib/post';
import { WithChildren } from '../types';

const RightContainer = ({
    children
} : WithChildren
) => {
    const posts = getAllPosts();

    return (
        <aside className="bg-[var(--footer-color)] flex-[2] hidden sm:block md:flex md:items-center md:flex-col p-2 gap-4">
            <Elements.Profile />
            {children}
            <Elements.UnitContainer>
                <h2>おすすめのブログ</h2><hr />
                <Blog.DisplayPosts posts={posts} displayCount={3} sortType='random' />
            </Elements.UnitContainer>
        </aside>
    );
}

export default RightContainer;
