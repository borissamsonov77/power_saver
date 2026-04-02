import type { Source } from '@/lib/mdx'

interface SourceListProps {
  sources: Source[]
  note?: string
}

export default function SourceList({ sources, note }: SourceListProps) {
  if (!sources || sources.length === 0) return null

  return (
    <aside className="mt-10 border-t border-gray-200 pt-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Джерела / Sources
      </h2>
      {note && (
        <p className="text-sm text-gray-500 mb-3 italic">{note}</p>
      )}
      <ol className="space-y-1 text-sm text-gray-600">
        {sources.map((src, i) => (
          <li key={i}>
            <span className="font-medium">{i + 1}.</span>{' '}
            <a
              href={src.url}
              rel="nofollow"
              target="_blank"
              className="text-blue-600 hover:underline break-all"
            >
              {src.text}
            </a>
            {src.accessed && (
              <span className="text-gray-400 ml-1">(перевірено: {src.accessed})</span>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
