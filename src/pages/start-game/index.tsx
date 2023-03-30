import { MotionButton, MotionPage } from '@/shared/ui'
import { SettingsButton, settingsSelectors } from '@/entities/settings'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@/shared/configs'
import { Heading } from '@/shared/ui/heading'
import { useAudio } from '@/shared/hooks'

export const StartGame = () => {
  const navigate = useNavigate()
  const isSoundTrackEnabled = settingsSelectors.use.isSoundTrackEnabled()
  const { playAudio } = useAudio()
  const handleStartGame = () => {
    if (isSoundTrackEnabled) {
      playAudio(() => {
        navigate(Routes.FIGHTER_SELECT)
      })
    } else navigate(Routes.FIGHTER_SELECT)
  }

  return (
    <MotionPage className='relative flex h-screen min-h-screen flex-col items-center justify-center bg-[url(background/start-game.jpg)] bg-cover bg-center bg-no-repeat'>
      <Heading className='absolute top-60'>Mortal Kombat</Heading>
      <MotionButton onClick={handleStartGame}>Start game</MotionButton>
      <SettingsButton />
    </MotionPage>
  )
}
