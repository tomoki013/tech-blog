import Link from "next/link";
import styles from './PageTopIcon.module.scss';

const PageTopIcon = () => {
    return(
        <Link
            href={'#'}
            className={styles.page_top_icon}
        >
            <p>Top</p>
        </Link>
    );
}

export default PageTopIcon;
