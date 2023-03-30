import { useNavigate } from 'react-router-dom'
import { settingsSelectors } from '@/entities/settings'
import { useAudio } from '@/shared/hooks'

export const GoBackButton = () => {
  const isSoundTrackEnabled = settingsSelectors.use.isSoundTrackEnabled()
  const navigate = useNavigate()
  const { playAudio } = useAudio()

  const handleGoBack = () => {
    if (isSoundTrackEnabled) {
      playAudio(() => {
        navigate('/')
      })
    } else navigate('/')
  }

  return (
    <button
      onClick={handleGoBack}
      className='btn absolute left-5 top-5 z-10 border-0 bg-transparent font-immortal transition-all duration-300 hover:bg-transparent'
    >
      Home
    </button>
  )
}
