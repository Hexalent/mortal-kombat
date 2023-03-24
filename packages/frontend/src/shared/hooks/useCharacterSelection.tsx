import { heroesSelectors } from '@/entities'
import { getCharacters } from '@/shared/lib/images'
import { useEffect } from 'react'

export const useCharacterSelection = () => {
  const setActiveHero = heroesSelectors.use.setActiveHero()
  const setCharacters = heroesSelectors.use.setCharacters()

  useEffect(() => {
    getCharacters().then(characters => {
      setCharacters(characters)
      setActiveHero(characters[0])
    })
  }, [setActiveHero, setCharacters])
}
