import { VariantProps, cva } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "size-4",
      sm: "size-2",
      lg: "size-6",
      icon: "size-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

function Spinner({ size }: SpinnerProps) {
  return <LoaderIcon className={spinnerVariants({ size })} />;
}

export default Spinner;
