import Link from "next/link"

interface IconItemProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const IconItem: React.FC<IconItemProps> = ({ href, children, className }) => {
    return (
        <div className='flex bg-[var(--bg-color)] p-1'>
            <Link
                href={href}
                target='_blank'
                rel="noopener noreferrer"
                className={`' text-5xl text-[var(--reverse-color)] hover:opacity-70 ${className} '`}
            >
                {children}
            </Link>
        </div>
    );
}

export default IconItem;
