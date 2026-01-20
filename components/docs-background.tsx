export function DocsBackground() {
  return (
    <div className='absolute inset-0 -z-10 h-full w-full overflow-hidden bg-background'>
      {/* Light Mode: Subtle radial gradient */}
      <div className='absolute inset-0 bg-background transition-colors duration-500' />

      {/* Spotlight Effect - Moved to FAR Right and made subtler */}
      <div className='absolute top-[-20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-foreground/5 blur-[120px] pointer-events-none' />

      {/* Grid Pattern - Very faint */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none'></div>
    </div>
  )
}
