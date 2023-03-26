import { create } from 'zustand'
import { createSelectorFunctions } from '@/shared/lib/selectors'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  areDetailsEnabled: boolean
  isSoundEnabled: boolean
  toggleDetailsVisibility: () => void
  toggleSound: () => void
}

const useSettingsStore = create(
  persist(
    immer<SettingsStore>(set => ({
      areDetailsEnabled: false,
      isSoundEnabled: true,
      toggleDetailsVisibility: () =>
        set(state => {
          state.areDetailsEnabled = !state.areDetailsEnabled
        }),
      toggleSound: () =>
        set(state => {
          state.isSoundEnabled = !state.isSoundEnabled
        })
    })),
    { name: 'settings' }
  )
)

const settingsSelectors = createSelectorFunctions(useSettingsStore)

export { useSettingsStore, settingsSelectors }
