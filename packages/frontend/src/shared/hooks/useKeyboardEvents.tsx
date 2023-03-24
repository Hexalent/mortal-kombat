import { useCallback, useEffect } from 'react'
import { Character } from '@/shared/lib/images'
import { heroesSelectors } from '@/entities'

export const useKeyboardEvents = () => {
  const activeHero = heroesSelectors.use.activeHero()
  const setActiveHero = heroesSelectors.use.setActiveHero()
  const characters = heroesSelectors.use.characters()
  const selectHero = heroesSelectors.use.selectHero()
  const selectedHeroes = heroesSelectors.use.selectedHeroes()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      console.log('key', event.code)
      switch (event.code) {
        case 'ArrowUp': {
          const newActiveHero = characters.find(hero => hero.number === (activeHero as Character)?.number + 10)
          if (newActiveHero) setActiveHero(newActiveHero)
          break
        }
        case 'ArrowDown': {
          const newActiveHero = characters.find(hero => hero.number === (activeHero as Character)?.number - 10)
          if (newActiveHero) setActiveHero(newActiveHero)
          break
        }
        case 'ArrowLeft': {
          const newActiveHero = characters.find(hero => hero.number === (activeHero as Character)?.number - 1)
          if (newActiveHero) setActiveHero(newActiveHero)
          break
        }
        case 'ArrowRight': {
          const newActiveHero = characters.find(hero => hero.number === (activeHero as Character)?.number + 1)
          if (newActiveHero) setActiveHero(newActiveHero)
          break
        }

        case 'Enter':
          selectHero(activeHero as Character)
          setActiveHero(selectedHeroes.length === 0 ? characters[0] : characters[1])
          break

        default:
          break
      }
    },
    [activeHero, characters, selectHero, selectedHeroes.length, setActiveHero]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
