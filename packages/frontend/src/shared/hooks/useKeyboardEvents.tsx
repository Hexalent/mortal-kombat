import { useCallback, useEffect } from 'react'
import { Character } from '@/shared/lib/images'
import { heroesSelectors } from '@/entities'
import { off, on } from '@/shared/utils'
import { useAudio } from '@/shared/hooks/useAudio'

export const useKeyboardEvents = () => {
  const { playAudio } = useAudio()
  const activeHero = heroesSelectors.use.activeHero()
  const setActiveHero = heroesSelectors.use.setActiveHero()
  const characters = heroesSelectors.use.characters()
  const selectHero = heroesSelectors.use.selectHero()
  const selectedHeroes = heroesSelectors.use.selectedHeroes()
  const unselectLastHero = heroesSelectors.use.unselectLastHero()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { code } = event
      playAudio()

      const activeHeroNum = activeHero?.number ?? 0
      const nextActiveHero = characters.find(hero => hero.number === activeHeroNum + KEY_DIRECTION_MAP[code])

      if (nextActiveHero || (code === ACTIONS_MAP.APPLY && activeHero)) {
        setActiveHero(nextActiveHero ?? selectedHeroes[0] ?? characters[0])
        if (code === ACTIONS_MAP.APPLY && activeHero) selectHero(activeHero as Character)
      } else if (code === ACTIONS_MAP.ESCAPE) unselectLastHero()
    },
    [activeHero, characters, selectHero, selectedHeroes, setActiveHero, unselectLastHero, playAudio]
  )

  useEffect(() => {
    on(document, 'keydown', handleKeyDown)
    return () => {
      off(document, 'keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

const KEY_DIRECTION_MAP: Record<string, number> = {
  ArrowUp: -5,
  ArrowDown: 5,
  ArrowLeft: -1,
  ArrowRight: 1
}

const ACTIONS_MAP: Record<string, string> = {
  APPLY: 'Enter',
  ESCAPE: 'Escape'
}
