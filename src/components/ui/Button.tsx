import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  full?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', full, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center h-11 rounded-full font-semibold transition active:scale-[.99] disabled:opacity-60';
    const styles =
      variant === 'primary'
        ? 'bg-[#b6ff00] text-black hover:opacity-90'
        : 'border border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800/70';
    const width = full ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${base} ${styles} ${width} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
