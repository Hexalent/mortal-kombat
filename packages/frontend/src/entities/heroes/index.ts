import { create } from 'zustand'
import { createSelectorFunctions } from '@/shared/lib/selectors'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { Character } from '@/shared/lib/images'

type Hero = {
  title: string
  img: string
  gif: string
  number: number
}

interface HeroesStore {
  selectedHeroes: Hero[]
  characters: Character[]
  setCharacters: (characters: Character[]) => void
  activeHero: Hero | null
  selectHero: (selectedHero: Hero) => void
  setActiveHero: (activeHero: Hero | null) => void
}

export const useHeroesStore = create<HeroesStore>(set => ({
  characters: [],
  selectedHeroes: [],
  activeHero: null,
  selectHero: (selectedHero: Hero) => {
    set(state => {
      const selectedHeroes = state.selectedHeroes.filter(hero => hero.number !== selectedHero.number)
      const updatedSelectedHeroes =
        selectedHero.number === state.activeHero?.number
          ? [selectedHero, ...selectedHeroes]
          : [...selectedHeroes, selectedHero]
      const updatedActiveHero = updatedSelectedHeroes[0] ?? null
      return { selectedHeroes: updatedSelectedHeroes, activeHero: updatedActiveHero }
    })
  },
  setCharacters: (characters: Character[]) => {
    set({ characters })
  },
  setActiveHero: (activeHero: Hero | null) => {
    set({ activeHero })
  }
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useHeroesStore', useHeroesStore)
}

export const heroesSelectors = createSelectorFunctions(useHeroesStore)
