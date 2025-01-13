import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/post";
import { Post } from '@/lib/types';

const DisplayPosts: React.FC = () => {
    let posts: Post[] = getAllPosts();
    posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <ul>
            {posts.map((post) => (
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

export default DisplayPosts;
