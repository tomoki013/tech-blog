import Link from "next/link"
import { IconItemProps } from '../types';

const IconItem = ({
    href,
    children,
    className
} : IconItemProps
) => {
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
