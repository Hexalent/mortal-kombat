import { useCallback, useEffect } from 'react'
import { Character, Stage } from '@/shared/lib/images'
import { heroesSelectors } from '@/entities'
import { off, on } from '@/shared/utils'
import { useAudio } from '@/shared/hooks/useAudio'

export const useKeyboardEvents = () => {
  const { playAudio } = useAudio()
  const activeHero = heroesSelectors.use.activeHero()
  const activeStage = heroesSelectors.use.activeStage()

  const setActiveHero = heroesSelectors.use.setActiveHero()
  const setActiveStage = heroesSelectors.use.setActiveStage()

  const characters = heroesSelectors.use.characters()
  const stages = heroesSelectors.use.stages()

  const selectHero = heroesSelectors.use.selectHero()
  const selectStage = heroesSelectors.use.selectStage()

  const selectedHeroes = heroesSelectors.use.selectedHeroes()
  const selectedStage = heroesSelectors.use.selectedStage()

  const unselectLastHero = heroesSelectors.use.unselectLastHero()
  const unselectStage = heroesSelectors.use.unselectStage()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { code } = event
      playAudio()

      const activeHeroNum = activeHero?.number ?? 0
      const nextActiveHero = characters.find(hero => hero.number === activeHeroNum + KEY_DIRECTION_MAP[code])

      if (nextActiveHero || (code === 'Enter' && activeHero)) {
        setActiveHero(nextActiveHero ?? selectedHeroes[0] ?? characters[0])
        if (code === ACTIONS_MAP.APPLY && activeHero) selectHero(activeHero as Character)
      } else if (code === ACTIONS_MAP.ESCAPE) unselectLastHero()

    },
    [
      activeHero,
      activeStage,
      characters,
      stages,
      selectHero,
      selectStage,
      selectedHeroes,
      selectedStage,
      setActiveHero,
      setActiveStage,
      unselectLastHero,
      unselectStage
    ]
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

const KEY_STAGE: Record<string, number> = {
  KeyQ: 0,
  KeyW: 1,
  KeyE: 2,
  KeyR: 3,
  KeyT: 4,
  KeyY: 5
}

const ACTIONS_MAP: Record<string, string> = {
  APPLY: 'Enter',
  ESCAPE: 'Escape'
}
