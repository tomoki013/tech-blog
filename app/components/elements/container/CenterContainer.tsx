interface CenterContainerProps {
    children?: React.ReactNode;
    className?: string;
}

const CenterContainer: React.FC<CenterContainerProps> = ({ children, className }) => {
    return (
        <main className={`" flex-shrink-0 p-2 flex-[3] ${className} "`}>
            {children}
        </main>
    );
}

export default CenterContainer;
