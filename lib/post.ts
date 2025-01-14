import { Post } from './types';
import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';

export const getAllPosts = (): Post[] => {
    const postsDirectories = path.join(process.cwd(), 'posts');
    return fs.readdirSync(postsDirectories)
    .map((fileName) => {
        const fullPath = path.join(postsDirectories, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContents) as GrayMatterFile<string> & { data: Post };

        return {
            title: data.title,
            description: data.description,
            date: data.date, // 変更: 配列から単一の文字列に
            image: data.image,
            alt: data.alt,
            tags: data.tags || [],
            slug: fileName.replace(/\.md$/, ''),
        };
    })
}

export const getPostBySlug = async (slug: string) => {
    const postsDirectories = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectories, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContents) as GrayMatterFile<string> & { data: Post };

    return {
        content: content, // ReactMarkdownコンポーネントでラップするのはコンポーネント側で行います
        ...data,
        slug,
    };
}

export const getPostByTag = (tag: string) => {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.tags && post.tags.includes(tag));
}
