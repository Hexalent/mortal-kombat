import { useCallback, useEffect } from 'react'
import { Character } from '@/shared/lib/images'
import { heroesSelectors } from '@/entities'

export const useKeyboardEvents = () => {
  const activeHero = heroesSelectors.use.activeHero()
  const setActiveHero = heroesSelectors.use.setActiveHero()
  const characters = heroesSelectors.use.characters()
  const selectHero = heroesSelectors.use.selectHero()
  const selectedHeroes = heroesSelectors.use.selectedHeroes()
  const unselectLastHero = heroesSelectors.use.unselectLastHero()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { code } = event
      const activeHeroNum = activeHero?.number ?? 0
      const nextActiveHero = characters.find(hero => hero.number === activeHeroNum + KEY_DIRECTION_MAP[code])

      if (nextActiveHero || (ACTIONS_MAP[code] && activeHero)) {
        setActiveHero(nextActiveHero ?? selectedHeroes[0] ?? characters[0])
        if (code === ACTIONS_MAP.select && activeHero) selectHero(activeHero as Character)
        if (code === ACTIONS_MAP.goBack) unselectLastHero()
      }
    },
    [activeHero, characters, selectHero, selectedHeroes, setActiveHero, unselectLastHero]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
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
  KeyE: 'select',
  KeyQ: 'goBack'
}
