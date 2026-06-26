export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[color:var(--surface)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[color:var(--brand-soft)] to-transparent" />
      <div className="mx-auto w-full max-w-[1100px] px-4 py-12 sm:px-5 sm:py-16 md:py-20">
        {eyebrow && (
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[color:var(--brand)]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-full break-words font-display text-[28px] font-bold leading-tight text-foreground sm:text-[34px] lg:text-[48px]">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl break-words text-base leading-8 text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
