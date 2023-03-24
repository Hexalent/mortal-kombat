import { MotionPage } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@/shared/configs'

export const StartGame = () => {
  const navigate = useNavigate()
  const handleStartGame = () => {
    navigate(Routes.FIGHTER_SELECT)
  }

  return (
    <MotionPage className='start-game-bg flex min-h-screen items-center justify-center bg-cover bg-center'>
      <button
        className='rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'
        onClick={handleStartGame}
      >
        Start game
      </button>
    </MotionPage>
  )
}
