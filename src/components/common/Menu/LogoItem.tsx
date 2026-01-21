export default function LogoItem({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div 
      id={id} 
      className="burger_logo_item absolute w-[8em] h-[8em] p-[1em] bg-white rounded-lg opacity-0 flex items-center justify-center shadow-2xl -translate-x-[150%] -translate-y-full"
    >
      {children}
    </div>
  );
}