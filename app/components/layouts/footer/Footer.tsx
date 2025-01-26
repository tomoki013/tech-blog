import * as Elements from '@/app/components/elements/index';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--footer-color)] pt-4">
            <p className="text-center">&copy; {currentYear} Tomokich Tech-Blog</p>
            <Elements.Navigation />
            <Elements.PageTopIcon />
        </footer>
    );
}

export default Footer;
