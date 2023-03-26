import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { settingsSelectors } from '@/entities/settings'

const DEFAULT_MUSIC_PATH = '/audio/action-sound.mp3'
export const useAudio = (path: string = DEFAULT_MUSIC_PATH) => {
  const isSoundTrackEnabled = settingsSelectors.use.isSoundTrackEnabled()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(new Audio(path))
  const audio = audioRef.current

  const handleAudioEnd = useCallback(() => {
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    if (isPlaying && isSoundTrackEnabled) {
      audio.play()
    } else {
      audio.pause()
    }

    audio.addEventListener('ended', handleAudioEnd)

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleAudioEnd)
    }
  }, [audio, handleAudioEnd, isPlaying, isSoundTrackEnabled])

  const playAudio = useCallback(
    (callback?: () => void) => {
      setIsPlaying(true)
      audio.addEventListener(
        'ended',
        () => {
          if (callback) callback()
          setIsPlaying(false)
        },
        { once: true }
      )
    },
    [audio]
  )

  const togglePlayback = useCallback(() => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying)
  }, [])

  return useMemo(() => ({ isPlaying, togglePlayback, playAudio }), [isPlaying, playAudio, togglePlayback])
}
