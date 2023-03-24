import { useCallback, useMemo, useState } from 'react'

interface AudioControlHook {
  visualColor: string
  visualStrokeWidth: string
  visualDuration: string
  toggleAudioPlayback: () => Promise<void>
}

export const useAudioControl = (): AudioControlHook => {
  const visualColor = '#FFF'
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [visualStrokeWidth] = useState<string>('1')
  const [visualDuration, setVisualDuration] = useState<string>('0ms')
  const audioElement = useMemo<HTMLAudioElement>(() => new Audio('/audio/layer-music.mp3'), [])

  const toggleAudioPlayback = useCallback(async () => {
    setIsPlaying(!isPlaying)
    setVisualDuration(isPlaying ? '1300ms' : '0ms')
    audioElement.loop = isPlaying
    await (isPlaying ? audioElement.play() : audioElement.pause())
  }, [audioElement, isPlaying])

  return useMemo<AudioControlHook>(
    () => ({
      visualColor,
      visualStrokeWidth,
      visualDuration,
      toggleAudioPlayback
    }),
    [visualColor, visualDuration, toggleAudioPlayback, visualStrokeWidth]
  )
}
