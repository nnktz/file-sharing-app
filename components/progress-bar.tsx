interface ProgressBarProps {
  progress: number
}

export const ProgressBarComponent = ({ progress }: ProgressBarProps) => {
  return (
    <div className="mt-3 h-4 w-full rounded-full bg-gray-400">
      <div
        className="select-none rounded-full bg-primary text-xs text-white"
        style={{ width: `${progress}%` }}
      >
        {`${Number(progress).toFixed(0)}%`}
      </div>
    </div>
  )
}
