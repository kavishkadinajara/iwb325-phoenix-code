"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";

// Extending the ButtonProps to include the Button's variant and other props
type Props = ButtonProps & {
  pendingText?: string;
};

const SubmitButton = ({ children, pendingText, variant, size, className, ...props }: Props) => {
  const { pending } = useFormStatus();

  const isPending = pending;
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      type="submit"
      disabled={isPending}
      {...props}
    >
      {isPending ? pendingText : children}
    </Button>
  );
};

export default SubmitButton;