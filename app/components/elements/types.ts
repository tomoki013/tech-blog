export interface WithChildren {
    children?: React.ReactNode;
}

export interface WithClassname {
    className?: string;
}

export interface IconItemProps extends WithChildren, WithClassname {
    href: string;
}

export interface TagsProps {
    tags: string[];
    hideAll?: boolean;
}

export interface ContainerProps extends WithChildren, WithClassname {}
