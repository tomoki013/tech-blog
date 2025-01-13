interface FlexWrapperProps {
    children?: React.ReactNode;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ children }) => {
    return (
        <div className="flex">
            {children}
        </div>
    );
}

export default FlexWrapper;