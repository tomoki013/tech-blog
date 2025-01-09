import { Post } from './types';
import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';


export const getAllPosts = (): Post[] => {
    const postsDirectories = path.join(process.cwd(), 'posts');
    return fs.readdirSync(postsDirectories)
    .map((fileName) => {
        const fullPath = path.join(postsDirectories, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContents) as GrayMatterFile<string> & { data: Post };

        const date: string[] = data.date || [];

        return {
            title: data.title,
            description: data.description,
            date: date,
            image: data.image,
            alt: data.alt,
            slug: fileName.replace(/\.md$/, ''),
        };
    })
}

export const getPostBySlug = async (slug: string) => {
    const postsDirectories = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectories, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContents) as GrayMatterFile<string> & { data: Post };

    const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

    return {
        content: String(htmlContent),
        ...data,
        slug,
    };
}
