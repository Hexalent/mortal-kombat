import { create } from 'zustand'

type Player = {
  title: string
  img: string
  gif: string
  number: number
}

interface HeroesStore {
  firstPlayer: Player | null
  secondPlayer: Player | null
  setFirstPlayer: (player: Player) => void
  setSecondPlayer: (player: Player) => void
}

export const useHeroes = create<HeroesStore>(set => ({
  firstPlayer: null,
  secondPlayer: null,
  setFirstPlayer: (firstPlayer: Player) => {
    set({ firstPlayer })
  },
  setSecondPlayer: (secondPlayer: Player) => {
    set({ secondPlayer })
  }
}))
