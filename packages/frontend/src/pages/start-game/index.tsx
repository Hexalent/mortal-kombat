import { MotionPage } from '@/shared/ui'

export const StartGame = () => {
  return (
    <MotionPage className='flex min-h-screen items-center justify-center'>
      <button className='rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'>Start game</button>
    </MotionPage>
  )
}
