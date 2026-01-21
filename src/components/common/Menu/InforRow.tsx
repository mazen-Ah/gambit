export default function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between w-full max-md:flex-col max-md:gap-4">
      <div className="flex items-center justify-center gap-2 border border-white/30 px-4 py-2 rounded-full h-fit">
        {/* Icon Placeholder */}
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <span className="uppercase text-sm tracking-wide">{label}</span>
      </div>
      <div className="w-[60%] max-md:w-full flex justify-between">
        {children}
      </div>
    </div>
  );
}
