"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Post } from '@/lib/types';
import { Suspense } from "react";

interface DisplayPostsProps {
    posts: Post[];
    displayCount?: number;
    sortType?: 'latest' | 'oldest' | 'random';
}

const DisplayPostsItems: React.FC<DisplayPostsProps> = ({ posts, displayCount, sortType='latest' }) => {
    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");

    let filteredPosts = tag && tag !== "全て" ? posts.filter((post) => post.tags?.includes(tag)) : posts;

    const count = displayCount || filteredPosts.length;

    if (sortType === 'oldest') {
        filteredPosts = filteredPosts.sort((a, b) => new Date(a.date[0]).getTime() - new Date(b.date[0]).getTime());
    } else if (sortType === 'random') {
        filteredPosts = filteredPosts.sort(() => Math.random() - 0.5);
    } else {
        filteredPosts = filteredPosts.sort((a, b) => new Date(b.date[0]).getTime() - new Date(a.date[0]).getTime());
    }

    return (
        <ul>
            {filteredPosts.slice(0, count).map((post) => (
                <li key={post.slug} className="border-y border-[var(--reverse-color)] my-4">
                    <Link href={`/post/${post.slug}`} className="grid grid-cols-[1fr_4fr] grid-rows-[auto_auto_auto] text-left p-2 hover:bg-[var(--footer-color)]">
                        <Image
                            src={post.image}
                            alt={post.alt}
                            width={70}
                            height={70}
                            className="col-span-1 row-span-3"
                        />
                        <h2 className="col-span-1 row-span-1 underline">
                            {post.title.length > 15 ? post.title.substring(0,15) + '...' : post.title}
                        </h2>
                        <p className="col-span-1 row-span-1 text-lg">
                        {post.description.length > 30 ? post.description.substring(0, 40) + '...' : post.description}
                        </p>
                        <p className="col-span-1 row-span-1">{post.date}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

const DisplayPosts: React.FC<DisplayPostsProps> = ({ posts, displayCount, sortType }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DisplayPostsItems posts={posts} displayCount={displayCount} sortType={sortType} />
        </Suspense>
    )
}

export default DisplayPosts;
