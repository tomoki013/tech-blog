import { Suspense } from "react";
import DisplayPostsItems from "./DisplayPostItem";
import { DisplayPostsProps } from "../../types";
import { getAllPosts } from "@/lib/post";

const DisplayPosts = async ({
    displayCount,
    sortType,
    limitedTitle,
    limitedDescription,
} : DisplayPostsProps) => {
    const posts = await getAllPosts();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DisplayPostsItems posts={posts} displayCount={displayCount} sortType={sortType} limitedTitle={limitedTitle} limitedDescription={limitedDescription} />
        </Suspense>
    )
}

export default DisplayPosts;
