"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { TagsProps } from "../types";

// カスタムソートの順序を定義
const customOrder = ["全て", "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "AWS"];

const TagsItem = ({
    tags,
    hideAll
} : TagsProps
) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('tag') || "全て";

    // カスタムソート関数
    const customSort = (a: string, b: string) => {
        const indexA = customOrder.indexOf(a);
        const indexB = customOrder.indexOf(b);

        if (indexA === -1 && indexB === -1) {
            // 両方ともカスタム順序にない場合はアルファベット順にソート
            return a.localeCompare(b);
        } else if (indexA === -1) {
            // aがカスタム順序にない場合は後にソート
            return 1;
        } else if (indexB === -1) {
            // bがカスタム順序にない場合は後にソート
            return -1;
        } else {
            // 両方ともカスタム順序にある場合はその順序に従ってソート
            return indexA - indexB;
        }
    };

    // タグをカスタムソート
    const sortedTags = hideAll ? [...tags].sort(customSort) : ["全て", ...tags].sort(customSort);

    return (
        <ul className='mb-2 flex mt-2 text-[var(--reverse-color)]'>
            {sortedTags.map((tag, index) => (
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
