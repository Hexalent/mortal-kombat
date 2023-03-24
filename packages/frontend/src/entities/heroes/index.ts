import { create } from 'zustand'
import { createSelectorFunctions } from '@/shared/lib/selectors'

type Hero = {
  title: string
  img: string
  gif: string
  number: number
}

interface HeroesStore {
  selectedHeroes: Hero[]
  activeHero: Hero | null
  selectHero: (selectedHero: Hero) => void
  setActiveHero: (activeHero: Hero | null) => void
}

export const useHeroesStore = create<HeroesStore>(set => ({
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
  setActiveHero: (activeHero: Hero | null) => {
    set({ activeHero })
  }
}))

export const heroesSelectors = createSelectorFunctions(useHeroesStore)
