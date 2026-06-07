import logoUrl from "@/assets/myroomiee-logo.png";

export function BrandLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className}`}>
      <img
        src={logoUrl}
        alt="MyRoomiee"
        className="h-full w-full object-contain"
        width={512}
        height={512}
        decoding="async"
      />
    </span>
  );
}
