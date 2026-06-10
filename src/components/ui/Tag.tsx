import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export default function Tag({
  children,
  variant = 'default',
  className
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        variant === 'default' && 'bg-brand-muted text-brand-secondary',
        variant === 'accent' && 'bg-brand-accent/10 text-brand-accent',
        className
      )}
    >
      {children}
    </span>
  );
}
