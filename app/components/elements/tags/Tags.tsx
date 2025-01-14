import Link from "next/link";

interface TagsProps {
    tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <ul className='mb-2 flex mt-2 text-[var(--reverse-color)]'>
            {tags.map((tag, index) => (
                <li key={index}>
                    <Link href={`/blogList?tag=${tag}`}>
                        <p className='border border-[var(--reverse-color)] rounded-xl bg-[var(--footer-color)] p-1 m-1'>{tag}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Tags;
