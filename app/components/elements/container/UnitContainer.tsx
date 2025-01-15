interface UnitContainerProps {
    children: React.ReactNode;
    className?: string;
}

const UnitContainer: React.FC<UnitContainerProps> = ({ children, className }) => {
    return (
        <section className={`" bg-[var(--bg-color)] rounded-md p-2 text-center w-[60%] ${className} "`}>
            {children}
        </section>
    );
}

export default UnitContainer;
