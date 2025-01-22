import { Suspense } from "react";
import DisplayPostsItems from "./DisplayPostItem";
import { DisplayPostsProps } from "../../types";



const DisplayPosts = ({
    posts,
    displayCount,
    sortType,
    limitedTitle,
    limitedDescription,
} : DisplayPostsProps) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DisplayPostsItems posts={posts} displayCount={displayCount} sortType={sortType} limitedTitle={limitedTitle} limitedDescription={limitedDescription} />
        </Suspense>
    )
}

export default DisplayPosts;
