import { motion } from "motion/react";
import type { buttonProps } from "../types/button.type";
import { Minus, Plus } from "lucide-react";

const colorClasses: Record<string, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
};

const Button = ({
  children,
  color,
  disabled = false,
  onClick
}: buttonProps) => {
  return (
    <motion.button
      disabled={disabled}
      className={`
        border-1 border-zinc-400 min-w-40 max-w-40 w-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
        ${colorClasses[color] || colorClasses.primary}
      `}
      variants={{ hover: { scale: 1.05 }}}
      onClick={onClick}
      whileHover={"hover"}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span variants={{hover: { rotate: 20 }}}>
        {color === "primary" ? <Plus /> : <Minus />}
      </motion.span>
      {children}
    </motion.button>
  );
}

export default Button;