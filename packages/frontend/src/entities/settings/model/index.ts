import { create as createStore } from 'zustand'
import { createSelectorFunctions } from '@/shared/lib/selectors'
import { immer as immerMiddleware } from 'zustand/middleware/immer'
import { persist as persistMiddleware } from 'zustand/middleware'

interface SettingsStore {
  areDetailsEnabled: boolean
  isSoundEnabled: boolean
  isSoundTrackEnabled: boolean
  toggleSetting: (setting: 'details' | 'sound' | 'soundtrack') => void
}

const useSettingsStore = createStore(
  persistMiddleware(
    immerMiddleware<SettingsStore>(update => ({
      areDetailsEnabled: false,
      isSoundTrackEnabled: false,
      isSoundEnabled: true,
      toggleSetting: (setting: 'details' | 'sound' | 'soundtrack') =>
        update(state => {
          switch (setting) {
            case 'details':
              state.areDetailsEnabled = !state.areDetailsEnabled
              break
            case 'sound':
              state.isSoundEnabled = !state.isSoundEnabled
              break
            case 'soundtrack':
              state.isSoundTrackEnabled = !state.isSoundTrackEnabled
              break
            default:
              break
          }
        })
    })),
    { name: 'settings' }
  )
)

const settingsSelectors = createSelectorFunctions(useSettingsStore)

export { useSettingsStore, settingsSelectors }
