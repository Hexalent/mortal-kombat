import { useCallback, useEffect } from 'react'
import { Stage } from '@/shared/lib/images'
import { heroesSelectors } from '@/entities'
import { off, on } from '@/shared/utils'

export const useStageSelection = () => {
  const activeStage = heroesSelectors.use.activeStage()
  const setActiveStage = heroesSelectors.use.setActiveStage()
  const stages = heroesSelectors.use.stages()
  const selectStage = heroesSelectors.use.selectStage()
  const selectedStage = heroesSelectors.use.selectedStage()
  const unselectStage = heroesSelectors.use.unselectStage()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { code } = event
      const nextActiveStage = !selectedStage && stages.find(stage => stage.number === KEY_STAGE[code])

      if (!selectedStage && nextActiveStage) {
        setActiveStage(nextActiveStage)
      } else if (!selectedStage && code === ACTIONS_MAP.APPLY) selectStage(activeStage as Stage)
      else if (code === ACTIONS_MAP.ESCAPE) unselectStage()
    },
    [activeStage, stages, selectStage, selectedStage, setActiveStage, unselectStage]
  )

  useEffect(() => {
    on(document, 'keydown', handleKeyDown)
    return () => {
      off(document, 'keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

const KEY_STAGE: Record<string, number> = {
  KeyQ: 0,
  KeyW: 1,
  KeyE: 2,
  KeyR: 3,
  KeyT: 4,
  KeyY: 5
}

const ACTIONS_MAP: Record<string, string> = {
  APPLY: 'Enter',
  ESCAPE: 'Escape'
}
