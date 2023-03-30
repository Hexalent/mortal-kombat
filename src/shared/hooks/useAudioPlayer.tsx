import { useContext } from 'react'
import { AudioPlayerContext } from '@/app/providers'

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext)
  if (context === null) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}
