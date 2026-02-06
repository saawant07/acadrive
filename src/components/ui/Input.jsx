import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Input({ className, ...props }) {
    return (
        <input
            autoComplete="off"
            className={twMerge(clsx(
                'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition-[border-color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-50',
                className
            ))}
            {...props}
        />
    );
}
