import { create } from 'zustand'
import { createSelectorFunctions } from '@/shared/lib/selectors'
import { Character, Stage } from '@/shared/lib/images'
import { persist } from 'zustand/middleware'

type Hero = {
  title: string
  img: string
  gif: string
  number: number
}

interface HeroesStore {
  selectedHeroes: Hero[]
  selectedStage: Stage | null
  unselectLastHero: () => void
  unselectStage: () => void
  characters: Character[]
  stages: Stage[]
  activeHero: Hero | null
  activeStage: Stage | null
  setCharacters: (characters: Character[]) => void
  setStages: (stages: Stage[]) => void
  selectHero: (selectedHero: Hero) => void
  selectStage: (selectedStage: Stage) => void
  setActiveHero: (activeHero: Hero | null) => void
  setActiveStage: (activeStage: Stage | null) => void
  resetGame: () => void
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

const useHeroesStore = create(
  persist<HeroesStore>(
    (set, get) => ({
      characters: [],
      stages: [],
      selectedHeroes: [],
      selectedStage: null,
      activeHero: null,
      activeStage: null,
      setCharacters: characters => set({ characters }),
      setStages: stages => set({ stages }),
      selectHero: selectedHero => set(state => updateSelectedHeroes(selectedHero, state)),
      selectStage: selectedStage => set({ selectedStage }),
      setActiveHero: activeHero => set({ activeHero }),
      setActiveStage: activeStage => set({ activeStage }),
      unselectLastHero: () => set({ selectedHeroes: get().selectedHeroes.slice(0, -1) }),
      unselectStage: () => set({ selectedStage: null }),
      resetGame: () =>
        set({
          selectedHeroes: [],
          selectedStage: null
        })
    }),
    { name: 'heroes' }
  )
)

const heroesSelectors = createSelectorFunctions(useHeroesStore)

export { useHeroesStore, heroesSelectors }
