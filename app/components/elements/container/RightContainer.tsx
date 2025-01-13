interface RightContainerProps {
    children?: React.ReactNode;
}

const RightContainer: React.FC<RightContainerProps> = ({ children }) => {
    return (
        <aside className="bg-[var(--footer-color)] flex-[2] hidden sm:block md:flex md:items-center md:flex-col p-2 gap-2">
            {children}
        </aside>
    );
}

export default RightContainer;
