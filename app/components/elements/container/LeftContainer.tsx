import * as Elements from '@/app/components/elements/index';

const LeftContainer: React.FC = () => {
    return (
        <aside className="bg-[var(--footer-color)] flex-[1] hidden lg:block">
            <div className='flex justify-end p-6'>
                <Elements.GitHubIcon />
            </div>
        </aside>
    );
}

export default LeftContainer;
