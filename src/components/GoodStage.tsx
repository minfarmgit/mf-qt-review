import clsx from "clsx";
import GoogleMapsIcon from '@/assets/google-maps.svg?react'
import YandexMapsIcon from '@/assets/yandex-maps.svg?react'
import type { AptItem } from "@/shared/constants/apt.ts";

interface GoodStageProps {
  className?: string
  setCurrentStage: (value: (string | null), replace?: boolean) => void
  aptItem: AptItem | null
}

export default function GoodStage({
  className,
  setCurrentStage,
  aptItem
}: GoodStageProps) {
  return (
    <div className={clsx('flex flex-1 flex-col gap-6 items-center justify-center p-4 text-lg', className)}>
      <div className="w-full">
        <p>Не могли бы Вы  оставить отзыв о своем посещении, это поможет нам стать лучше.</p>
        <p>Выберите площадку для отзыва.</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        { aptItem?.yandexMapsUrl && (
          <a className="w-full" rel="noopener noreferrer" target="_blank"  href={`${aptItem?.yandexMapsUrl}?tab=reviews`}>
            <button className="px-6 py-3 text-lg border flex items-center justify-center gap-2 border-accent rounded-xl w-full font-medium active:opacity-90">
              <YandexMapsIcon className="size-6" />
              <span>Яндекс Карты</span>
            </button>
          </a>
        ) }
        { aptItem?.googleMapsUrl && (
          <a className="w-full" rel="noopener noreferrer" target="_blank" href={`${aptItem?.googleMapsUrl}`}>
            <button onClick={() => setCurrentStage('2')} className="px-6 py-3 text-lg border flex items-center justify-center gap-2 border-accent rounded-xl w-full font-medium active:opacity-90">
              <GoogleMapsIcon className="size-6" />
              <span> Google Maps</span>
            </button>
          </a>
        ) }
      </div>
    </div>
  )
}