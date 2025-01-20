import { Suspense } from "react";
import DisplayPostsItems from "./DisplayPostItem";
import { DisplayPostsProps } from "../../types";



const DisplayPosts = ({
    posts,
    displayCount,
    sortType
} : DisplayPostsProps) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DisplayPostsItems posts={posts} displayCount={displayCount} sortType={sortType} />
        </Suspense>
    )
}

export default DisplayPosts;
