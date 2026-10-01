export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-serif text-[1.75rem] font-medium tracking-[0.32em]">SENA</span>
      <span className="mt-1 text-[0.58rem] font-semibold tracking-[0.34em] text-gold">HOTEL &amp; RESORT</span>
    </span>
  );
}
