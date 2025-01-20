import Link from "next/link";
import styles from './NavigationItem.module.scss';
import { IconItemProps } from "../types";

const NavigationItem = ({
    href,
    children,
    className
} : IconItemProps
) => {
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
