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
  unselectLastHero: () => void
  characters: Character[]
  activeHero: Hero | null
  setCharacters: (characters: Character[]) => void
  selectHero: (selectedHero: Hero) => void
  setActiveHero: (activeHero: Hero | null) => void
}

const updateSelectedHeroes = (selectedHero: Hero, state: HeroesStore) => {
  const numSelectedHeroes = state.selectedHeroes.length
  if (numSelectedHeroes < 2) {
    const filteredHeroes = state.selectedHeroes.filter(hero => hero.number !== selectedHero.number)
    const updatedHeroes =
      selectedHero.number === state.activeHero?.number
        ? [selectedHero, ...filteredHeroes]
        : [...filteredHeroes, selectedHero]
    const updatedActiveHero = updatedHeroes[0] ?? null
    return { selectedHeroes: updatedHeroes, activeHero: updatedActiveHero }
  }
  return state
}

const useHeroesStore = create<HeroesStore>((set, get) => ({
  characters: [],
  selectedHeroes: [],
  activeHero: null,
  setCharacters: characters => set({ characters }),
  selectHero: selectedHero => set(state => updateSelectedHeroes(selectedHero, state)),
  setActiveHero: activeHero => set({ activeHero }),
  unselectLastHero: () => set({ selectedHeroes: get().selectedHeroes.slice(0, -1) })
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useHeroesStore', useHeroesStore)
}

const heroesSelectors = createSelectorFunctions(useHeroesStore)

export { useHeroesStore, heroesSelectors }
