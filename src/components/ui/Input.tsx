import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;            // mensagem de erro opcional
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, type = 'text', ...props }, ref) => {
    const base =
      'h-11 w-full rounded-xl border bg-zinc-900 px-3 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500';
    const ok = 'border-zinc-800 focus:border-zinc-700 focus:ring-2 focus:ring-[#b6ff00]';
    const danger = 'border-red-600 focus:ring-red-600';

    return (
      <div className="space-y-1">
        <input
          ref={ref}
          type={type}
          className={`${base} ${error ? danger : ok} ${className}`}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? props.id + '-error' : undefined}
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
