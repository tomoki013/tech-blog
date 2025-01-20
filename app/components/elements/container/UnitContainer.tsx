import { ContainerProps } from "../types";

const UnitContainer = ({
    children,
    className
}: ContainerProps
) => {
    return (
        <section className={`" bg-[var(--bg-color)] rounded-md p-2 text-center w-[60%] ${className} "`}>
            {children}
        </section>
    );
}

export default UnitContainer;
