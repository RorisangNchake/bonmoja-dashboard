import { isOpen } from "../signals/isOpenSignal";
import { type ReactNode } from "react";

type BackdropProps = {
    children?: ReactNode;
};

const Backdrop = ({children}: BackdropProps) => {
     return isOpen.value ? (
        <div 
            className="fixed inset-0 bg-black/60 z-40"
        >
            {children}
        </div>
        ) : null;
};

export default Backdrop;