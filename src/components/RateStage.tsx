import clsx from "clsx";
import StarIcon from '@/assets/star.svg?react';

interface RateStageProps {
  className?: string
  rates: number[]
  currentRate: string | null | undefined
  setCurrentRate: (value: (string | null), replace?: boolean) => void
  setCurrentStage: (value: (string | null), replace?: boolean) => void
}

export default function RateStage({
  className,
  rates,
  currentRate,
  setCurrentRate,
  setCurrentStage
}: RateStageProps) {
  return (
    <div className={clsx('flex flex-1 flex-col items-center justify-center p-4', className)}>
      <div className="flex flex-col justify-center gap-2">
        <span className="text-secondary font-light text-sm">Нажмите на звёздочку, чтобы поставить оценку</span>
        <div className="flex items-center justify-center gap-3">
          {rates.map((rate, index) => (
            <div onClick={() => setCurrentRate(`${rate}`, true)} key={index}>
              <StarIcon className={clsx('size-10 fill-tertiary text-tertiary', {
                '!fill-accent !text-accent': currentRate != null && Number(currentRate) >= rate
              })} />
            </div>
          ))}
        </div>
      </div>
      <div className={clsx('flex items-center justify-center mt-6 w-full', {
        'opacity-0 pointer-events-none': currentRate === null
      })}>
        <button onClick={() => setCurrentStage('2')} className="px-6 py-3 bg-accent text-white rounded-xl w-full font-medium active:opacity-90">Подтвердить</button>
      </div>
    </div>
  )
}