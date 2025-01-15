"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface TagsProps {
    tags: string[];
    hideAll?: boolean;
}

const TagsItem: React.FC<TagsProps> = ({ tags, hideAll }) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('tag') || "全て";
    const allTags = hideAll ? [...tags] : ["全て", ...tags];
    return (
        <ul className='mb-2 flex mt-2 text-[var(--reverse-color)]'>
            {allTags.map((tag, index) => (
                <li key={index}>
                    <Link href={tag === "全て" ? `/blogList` : `/blogList?tag=${tag}`} scroll={false}>
                        <p className={`border border-[var(--reverse-color)] text-[var(--reverse-color)] bg-[var(--footer-color)] rounded p-1 m-1 ${query === tag ? '!text-[var(--bg-color)] bg-[var(--reverse-color)]' : ''}`}>{tag}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

const Tags: React.FC<TagsProps> = ({ tags, hideAll }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TagsItem tags={tags} hideAll={hideAll} />
        </Suspense>
    )
}

export default Tags;
