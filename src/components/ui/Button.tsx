import { cn } from '@/lib/utils';
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes
} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-accent text-white shadow-btn hover:opacity-90 active:scale-[0.97]',
  secondary:
    'bg-white text-brand-primary border border-brand-border hover:border-brand-accent hover:text-brand-accent active:scale-[0.97]',
  ghost: 'text-brand-primary hover:bg-black/5 active:scale-[0.97]'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  as,
  ...props
}: ButtonProps) {
  const styles = cn(
    'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 cursor-pointer select-none',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (as === 'a') {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={styles} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={styles} type="button" {...buttonProps}>
      {children}
    </button>
  );
}
