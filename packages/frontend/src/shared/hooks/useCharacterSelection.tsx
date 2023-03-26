import { heroesSelectors } from '@/entities'
import { getCharacters, getStages } from '@/shared/lib/images'
import { useCallback, useEffect } from 'react'

export const useCharacterSelection = () => {
  const setActiveHero = heroesSelectors.use.setActiveHero()
  const setActiveStage = heroesSelectors.use.setActiveStage()
  const setCharacters = heroesSelectors.use.setCharacters()
  const setStages = heroesSelectors.use.setStages()

  const getHeroesData = useCallback(async () => {
    const [characters, stages] = await Promise.all([getCharacters(), getStages()])

    setCharacters(characters)
    setActiveHero(characters[0])

    setStages(stages)
    setActiveStage(stages[0])
  }, [setActiveHero, setActiveStage, setCharacters, setStages])

  useEffect(() => {
    getHeroesData()
  }, [getHeroesData])
}
