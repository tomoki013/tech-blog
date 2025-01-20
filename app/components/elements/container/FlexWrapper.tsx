import { WithChildren } from "../types";

const FlexWrapper = ({
    children
} : WithChildren
) => {
    return (
        <div className="flex">
            {children}
        </div>
    );
}

export default FlexWrapper;