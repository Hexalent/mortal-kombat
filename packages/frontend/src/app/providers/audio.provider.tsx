import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react'

interface AudioPlayerValues {
  visualColor: string
  visualStrokeWidth: string
  visualDuration: string
  togglePlayback: () => Promise<void>
}

export const AudioPlayerContext = createContext({} as AudioPlayerValues)

export const AudioPlayerProvider = ({ children }: PropsWithChildren) => {
  const visualColor = '#FFF'
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [visualStrokeWidth] = useState<string>('1')
  const [visualDuration, setVisualDuration] = useState<string>('0ms')
  const audioElement = useMemo<HTMLAudioElement>(() => new Audio('/audio/layer-music.mp3'), [])

  const togglePlayback = useCallback(async () => {
    setIsPlaying(!isPlaying)
    setVisualDuration(isPlaying ? '1300ms' : '0ms')
    audioElement.loop = isPlaying
    await (isPlaying ? audioElement.play() : audioElement.pause())
  }, [audioElement, isPlaying])

  const value = useMemo<AudioPlayerValues>(
    () => ({
      visualColor,
      visualStrokeWidth,
      visualDuration,
      togglePlayback
    }),
    [visualColor, visualDuration, togglePlayback, visualStrokeWidth]
  )

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>
}
