import LogoIcon from '@/assets/logo.svg?react'
import StarIcon from '@/assets/star.svg?react'
import GoogleMapsIcon from '@/assets/google-maps.svg?react'
import YandexMapsIcon from '@/assets/yandex-maps.svg?react'
import { useParams } from 'react-router-dom'
import clsx from "clsx";
import { useQueryState } from "@/shared/hooks/useQueryState.ts";
import { ToastContainer, toast } from "react-toastify";
import type { FormEvent } from "react";

function App() {
  const { code } = useParams<{ code: string }>()
  const rates = [1,2,3,4,5];
  const [currentStage, setCurrentStage] = useQueryState<string>('stage', false)
  const [currentRate, setCurrentRate] = useQueryState<string>('rate', false)
  const [currentText, setCurrentText] = useQueryState<string>('text', false)

  const onSubmitSad = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentText('');
    toast("Успешно отправлено!");
  }

  return (
    <>
      <div className="min-h-dvh w-screen flex flex-col">
        <div className="flex flex-none flex-col gap-2 p-4 h-[130px]">
          <LogoIcon className="w-[120px] flex-none" />
          { currentStage != '2' && <span className="font-medium text-xl">Как вы оцениваете посещение <br/> Аптеки №{code}?</span> }
          { currentStage == '2' && currentRate != null && Number(currentRate) > 3 && <span className="font-medium text-xl">Спасибо за <br/> хорошую оценку!</span> }
          { currentStage == '2' && currentRate != null && Number(currentRate) <= 3 && <span className="font-medium text-xl">Нам очень жаль, что Вы получили негативный опыт!</span> }
        </div>
        <div className="flex-none w-full flex items-center bg-tertiary h-1">
          <div className={clsx('h-full bg-accent', ['2', '3'].includes(currentStage || '') ? 'w-full' : 'w-1/3')}></div>
        </div>
        { currentStage != '2' && (
          <div className="flex flex-1 flex-col items-center justify-center p-4">
            <div className="flex flex-col justify-center gap-2">
              <span className="text-secondary font-light text-sm">Нажмите на звёздочку, чтобы поставить оценку</span>
              <div className="flex items-center justify-center gap-3">
                {rates.map((rate, index) => (
                  <div onClick={() => setCurrentRate(`${rate}`)} key={index}>
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
        ) }
        { currentStage == '2' && currentRate != null && Number(currentRate) > 3 && (
          <div className="flex flex-1 flex-col gap-6 items-center justify-center p-4 text-lg">
            <div className="w-full">
              <p>Не могли бы Вы  оставить отзыв о своем посещении, это поможет нам стать лучше.</p>
              <p>Выберите площадку для отзыва.</p>
            </div>
            <div className="w-full flex flex-col gap-4">
              <a className="w-full" rel="noopener noreferrer" target="_blank"  href="https://yandex.by/maps/org/minskaya_farmatsiya/207425283449/reviews/?ll=29.133335%2C54.324763&tab=reviews&z=15">
                <button className="px-6 py-3 text-lg border flex items-center justify-center gap-2 border-accent rounded-xl w-full font-medium active:opacity-90">
                  <YandexMapsIcon className="size-6" />
                  <span>Яндекс Карты</span>
                </button>
              </a>
              <a className="w-full" rel="noopener noreferrer" target="_blank" href="https://www.google.com/maps/place/%D0%90%D0%BF%D1%82%D0%B5%D0%BA%D0%B0+%E2%84%9667+%D0%B3.%D0%9A%D1%80%D1%83%D0%BF%D0%BA%D0%B8/@54.324906,29.13323,17z/data=!3m1!4b1!4m6!3m5!1s0x46da93ab7b9aecd5:0x23cc291066b53b4a!8m2!3d54.324906!4d29.13323!16s%2Fg%2F11f646k87g?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D">
                <button onClick={() => setCurrentStage('2')} className="px-6 py-3 text-lg border flex items-center justify-center gap-2 border-accent rounded-xl w-full font-medium active:opacity-90">
                  <GoogleMapsIcon className="size-6" />
                  <span> Google Maps</span>
                </button>
              </a>
            </div>
          </div>
        ) }
        { currentStage == '2' && currentRate != null && Number(currentRate) <= 3 && (
          <div className="flex flex-1 flex-col items-center justify-center p-4 text-lg gap-6">
            <div>
              <p>Не могли бы рассказать о нём, это поможет нам стать лучше.</p>
            </div>
            <form onSubmit={onSubmitSad} className="flex flex-col w-full gap-4">
              <div className="flex w-full flex-col">
                <span className="text-sm">Текст отзыва<span className="text-[#EA4335]">*</span></span>
                <textarea value={currentText || ''} onChange={(e) => setCurrentText(e.target.value)} className="rounded-xl border border-accent outline-none p-2 min-h-[120px]" />
              </div>
              <button type="submit" className="px-6 py-3 bg-accent text-white rounded-xl w-full flex items-center justify-center font-medium active:opacity-90">Подтвердить</button>
            </form>
          </div>
        ) }
      </div>
      <ToastContainer theme="light" hideProgressBar />
    </>
  )
}

export default App
