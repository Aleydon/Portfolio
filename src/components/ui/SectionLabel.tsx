interface SectionLabelProps {
  children: React.ReactNode;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-6 flex items-center justify-between sm:mb-8">
      <h2 className="text-brand-primary text-lg font-semibold sm:text-xl">
        {children}
      </h2>
    </div>
  );
}
