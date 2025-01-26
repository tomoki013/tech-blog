import { Post } from './../../lib/types';

export interface ArticleProps {
    title: string;
    date: string;
    content: string;
    tags: string[];
}

export interface DisplayPostsProps {
    displayCount?: number;
    sortType?: 'latest' | 'oldest' | 'random';
    limitedTitle?: number;
    limitedDescription?: number;
}

export interface DisplayPostsItemProps extends DisplayPostsProps {
    posts: Post[];
}
