interface ComparisonRow {
  name: string
  capacity_wh: number
  power_w: number
  chemistry: string
  cycles: string
  price_uah: number
  buy_url?: string
}

export default function ComparisonTable({ models }: { models: ComparisonRow[] }) {
  if (!models?.length) return null

  const maxCap = Math.max(...models.map((m) => m.capacity_wh))
  const maxPow = Math.max(...models.map((m) => m.power_w))
  const minPrice = Math.min(...models.map((m) => m.price_uah))

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Модель</th>
            <th className="px-4 py-3 text-right">Ємність (Вт·год)</th>
            <th className="px-4 py-3 text-right">Потужність (Вт)</th>
            <th className="px-4 py-3 text-center">Хімія</th>
            <th className="px-4 py-3 text-center">Цикли</th>
            <th className="px-4 py-3 text-right">Ціна (грн)</th>
            {models.some((m) => m.buy_url) && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {models.map((m, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">{m.name}</td>
              <td className={`px-4 py-3 text-right ${m.capacity_wh === maxCap ? 'text-green-700 font-bold' : ''}`}>
                {m.capacity_wh.toLocaleString()}
              </td>
              <td className={`px-4 py-3 text-right ${m.power_w === maxPow ? 'text-green-700 font-bold' : ''}`}>
                {m.power_w.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">{m.chemistry}</td>
              <td className="px-4 py-3 text-center">{m.cycles}</td>
              <td className={`px-4 py-3 text-right ${m.price_uah === minPrice ? 'text-green-700 font-bold' : ''}`}>
                {m.price_uah.toLocaleString()} ₴
              </td>
              {models.some((m) => m.buy_url) && (
                <td className="px-4 py-3">
                  {m.buy_url && (
                    <a
                      href={m.buy_url}
                      rel="nofollow sponsored"
                      target="_blank"
                      className="text-blue-600 hover:underline whitespace-nowrap"
                    >
                      Купити →
                    </a>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-gray-400">
        * Ціни орієнтовні, станом на дату публікації. ✅ Найкраще значення у категорії.
      </p>
    </div>
  )
}
