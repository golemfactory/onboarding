import { forwardRef, ComponentProps } from "react";

import styles from "./button.module.css";

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ children, className = styles.button, ...rest }, ref) => {
    return (
      <button ref={ref} className={className} {...rest}>
        {children}
      </button>
    );
  }
);

export default Button;
