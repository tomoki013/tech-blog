import { ContainerProps } from "../types";

const CenterContainer = ({
    children,
    className
} : ContainerProps
) => {
    return (
        <main className={`" flex-shrink-0 p-2 flex-[3] ${className} "`}>
            {children}
        </main>
    );
}

export default CenterContainer;
