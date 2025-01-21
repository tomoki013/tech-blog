import Link from "next/link"
import styles from './IconItem.module.scss';
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
                className={`' ${styles.icon_item} ${className} '`}
            >
                {children}
            </Link>
        </div>
    );
}

export default IconItem;
