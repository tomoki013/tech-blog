import Link from "next/link";
import styles from './NavigationItem.module.scss';

interface NavigationItemProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ href, children, className }) => {
    return (
        <li>
            <Link
                href={href}
                className={`' ${styles.hover_animation} ${className} '`}>
                {children}
            </Link>
        </li>
    );
}

export default NavigationItem;
