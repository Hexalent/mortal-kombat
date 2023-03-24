import { heroesSelectors } from '@/entities'
import { getCharacters } from '@/shared/lib/images'
import { useEffect } from 'react'

export const useCharacterSelection = () => {
  const setActiveHero = heroesSelectors.use.setActiveHero()
  const setCharacters = heroesSelectors.use.setCharacters()

  useEffect(() => {
    getCharacters().then(res => {
      setCharacters(res)
      setActiveHero(res[0])
    })
  }, [setActiveHero, setCharacters])
}
