import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/post";
import { Post } from '@/lib/types';

const DisplayPosts: React.FC = () => {
    const posts: Post[] = getAllPosts();

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.slug} className="border border-y-[var(--reverse-color)] p-2">
                    <Link href={`/post/${post.slug}`} className="grid">
                        <Image
                            src={post.image}
                            alt={post.alt}
                            width={70}
                            height={70}
                        />
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>{post.date}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default DisplayPosts;
