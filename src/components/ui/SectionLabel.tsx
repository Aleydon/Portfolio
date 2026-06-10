import Link from 'next/link';

interface SectionLabelProps {
  children: React.ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function SectionLabel({
  children,
  viewAllHref,
  viewAllLabel = 'View all'
}: SectionLabelProps) {
  return (
    <div className="mb-6 flex items-center justify-between sm:mb-8">
      <h2 className="text-brand-primary text-lg font-semibold sm:text-xl">
        {children}
      </h2>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-brand-accent hover:text-brand-primary hidden text-sm font-medium transition-colors duration-150 sm:block"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}
