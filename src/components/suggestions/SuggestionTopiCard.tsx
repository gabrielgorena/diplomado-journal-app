interface SuggestionCardProps {
  title: string
  description: string
  onClick: () => void
}

export default function SuggestionTopiCard({ title, description, onClick }: SuggestionCardProps) {
  return (
    <div onClick={onClick} className="bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg p-4 cursor-pointer border border-zinc-700">
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-xs text-zinc-400">{description}</p>
    </div>
  )
}
