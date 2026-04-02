export default function SafetyWarning({ children }: { children?: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none">⚠️</span>
        <div className="text-sm text-orange-800">
          {children ?? (
            <>
              <strong className="block mb-1">Увага / Warning</strong>
              Підключення генераторів та інверторів до домашньої електромережі потребує
              кваліфікованого ліцензованого електрика. Самостійне підключення небезпечне
              і може порушувати місцеве законодавство.
              <br />
              <em className="block mt-1 text-orange-600">
                Connecting generators and inverters to home wiring requires a licensed electrician.
                DIY wiring is hazardous and may violate local safety regulations.
              </em>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
