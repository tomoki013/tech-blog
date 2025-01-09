import * as Elements from '@/app/components/elements/index';

const Footer: React.FC = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--footer-color)] pt-4">
            <p className="text-center">&copy; {currentYear} Tomokich Tech-Blog</p>
            <Elements.Navigation />
        </footer>
    );
}

export default Footer;
