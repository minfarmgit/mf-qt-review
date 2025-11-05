import LogoIcon from '@/assets/logo.svg?react'
import { useParams } from 'react-router-dom'
import clsx from "clsx";
import { useQueryState } from "@/shared/hooks/useQueryState.ts";
import { toast, ToastContainer } from "react-toastify";
import { type FormEvent, useState } from "react";
import RateStage from "@/components/RateStage.tsx";
import SadStage from "@/components/SadStage.tsx";
import GoodStage from "@/components/GoodStage.tsx";
import { sendReview } from "@/api/sendReview.ts";
import { APT_DATA, type AptItem } from "@/shared/constants/apt.ts";

function App() {
  const { code } = useParams<{ code: string }>()
  const currentApt: AptItem | null = APT_DATA[code || ''] || null;
  const rates = [1,2,3,4,5];
  const [currentStage, setCurrentStage] = useQueryState<string>('stage', false)
  const [currentRate, setCurrentRate] = useQueryState<string>('rate', false)
  const [currentText, setCurrentText] = useQueryState<string>('text', false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successStatus, setSuccessStatus] = useQueryState<string>('success', false)

  const onSubmitSad = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const status = await sendReview({
      rate: currentRate || 'unknown',
      message: currentText || 'unknown',
      apt: Number(code)
    })
    setCurrentText('', true);
    setCurrentStage('finished');
    setIsLoading(false);
    if (status >= 200 && status < 300) {
      setSuccessStatus('true', true);
    } else {
      setSuccessStatus(null, true);
      toast('Не удалось отправить отзыв');
    }
  }

  if (!code || !currentApt) {
    return (
      <div className="min-h-dvh w-screen flex flex-col items-center justify-center">
        <span className="font-medium text-xl">Аптека не найдена</span>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-dvh w-screen flex flex-col">
        <div className="flex flex-none flex-col gap-2 p-4 h-[130px]">
          <LogoIcon className="w-[120px] flex-none" />
          { currentStage != '2' && currentStage != 'finished' && <span className="font-medium text-xl">Как вы оцениваете посещение <br/> Аптеки №{currentApt.code}?</span> }
          { currentStage == '2' && currentRate != null && Number(currentRate) > 3 && <span className="font-medium text-xl">Спасибо за <br/> хорошую оценку!</span> }
          { currentStage == '2' && currentRate != null && Number(currentRate) <= 3 && <span className="font-medium text-xl">Нам очень жаль, что Вы получили негативный опыт!</span> }
          { currentStage == 'finished' && currentRate != null && <span className="font-medium text-xl">Ваш отзыв успешно <br/> отправлен</span> }
        </div>
        <div className="flex-none w-full flex items-center bg-tertiary h-1">
          <div className={clsx('h-full bg-accent', ['2', '3', 'finished'].includes(currentStage || '') ? 'w-full' : 'w-1/3')}></div>
        </div>
        { successStatus == 'true' ? (
          <div className="w-full flex flex-1 items-center justify-center">
            <span className="font-medium text-xl text-center">Отзыв отправлен.<br/>Благодарим за участие!</span>
          </div>
        ) : (
          <>
            { currentStage != '2' && currentStage != 'finished' && (
              <RateStage
                rates={rates}
                currentRate={currentRate}
                setCurrentRate={setCurrentRate}
                setCurrentStage={setCurrentStage}
              />
            ) }
            { currentStage == '2' && currentRate != null && Number(currentRate) > 3 && (
              <GoodStage aptItem={currentApt} setCurrentStage={setCurrentStage} />
            ) }
            { currentStage == '2' && currentRate != null && Number(currentRate) <= 3 && (
              <SadStage
                isLoading={isLoading}
                currentText={currentText}
                setCurrentText={setCurrentText}
                onSubmitSad={onSubmitSad}
              />
            ) }
            { currentStage == 'finished' && (
              <div className="flex flex-1 flex-col items-center justify-center p-4 text-lg gap-6">
                <span className="text-xl font-medium text-accent">Благодарим за ваш отзыв!</span>
              </div>
            ) }
          </>
        ) }
      </div>
      <ToastContainer theme="light" hideProgressBar />
    </>
  )
}

export default App
