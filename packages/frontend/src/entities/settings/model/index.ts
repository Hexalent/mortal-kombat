import { create } from 'zustand'
import { createSelectorFunctions } from '@/shared/lib/selectors'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  isDetailsEnabled: boolean
  toggleDetails: () => void
}

const useSettingsStore = create(
  persist(
    immer<SettingsStore>(set => ({
      isDetailsEnabled: false,
      toggleDetails: () =>
        set(state => {
          state.isDetailsEnabled = !state.isDetailsEnabled
        })
    })),
    { name: 'settings' }
  )
)

const settingsSelectors = createSelectorFunctions(useSettingsStore)

export { useSettingsStore, settingsSelectors }
