import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'h-9 w-full border-input bg-transparent px-3 py-1 text-sm shadow-sm',
        'border file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground focus-visible:outline-none',
        'focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
