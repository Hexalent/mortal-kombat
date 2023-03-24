import { MotionButton, MotionPage } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@/shared/configs'

export const StartGame = () => {
  const navigate = useNavigate()
  const handleStartGame = () => {
    navigate(Routes.FIGHTER_SELECT)
  }

  return (
    <MotionPage className='start-game-bg flex h-screen min-h-screen items-center justify-center bg-[url(/background/start-game.jpg)] bg-cover bg-center bg-no-repeat'>
      <MotionButton onClick={handleStartGame}>Start game</MotionButton>
    </MotionPage>
  )
}
