import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/post";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    const posts = getAllPosts();

    const filterPosts = tag
        ? posts.filter(post => post.tags && post.tags.includes(tag))
        : posts;

    return NextResponse.json(filterPosts);
}