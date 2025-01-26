import * as Elements from '@/app/components/elements/index';

const Header = () => {
    return (
        <header>
            <h1 className="text-center p-4">ともきちのITブログ</h1>
            <Elements.Navigation className='text-black bg-[var(--header-color)]' /> 
        </header>
    );
}

export default Header;
