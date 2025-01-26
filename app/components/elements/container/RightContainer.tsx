import * as Elements from '@/app/components/elements/index';
import * as Blog from '@/features/blog/index';
import { WithChildren } from '../types';

const RightContainer = ({
    children
} : WithChildren
) => {
    return (
        <aside className="bg-[var(--footer-color)] flex-[2] hidden sm:block md:flex md:items-center md:flex-col p-2 gap-4">
            <Elements.Profile />
            {children}
            <Elements.UnitContainer>
                <h2>おすすめのブログ</h2><hr />
                <Blog.DisplayPosts displayCount={3} sortType='random' limitedTitle={7} limitedDescription={10} />
            </Elements.UnitContainer>
        </aside>
    );
}

export default RightContainer;
