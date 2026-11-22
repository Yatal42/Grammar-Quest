export default function Stars({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= value ? '' : 'opacity-25 grayscale'}>
          ⭐
        </span>
      ))}
    </div>
  )
}
