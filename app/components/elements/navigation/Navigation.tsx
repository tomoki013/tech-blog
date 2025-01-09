import NavigationItem from "./NavigationItem";

interface NavigationProps {
    className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
    return (
        <nav className={`' py-2 ${className} '`}>
            <ul className="flex flex-wrap justify-center items-center gap-6">
                <NavigationItem href="/">
                    トップページ
                </NavigationItem>
                <NavigationItem href="/blogList">
                    ブログ一覧
                </NavigationItem>
                <NavigationItem href="/contact">
                    お問い合わせ
                </NavigationItem>
            </ul>
        </nav>
    );
}

export default Navigation;
