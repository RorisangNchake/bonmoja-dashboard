import type { ReactNode } from "react";

export type buttonProps = {
    children: ReactNode;
    color: "primary" | "secondary" | "danger";
    disabled?: boolean | undefined
    onClick?: () => void;
};