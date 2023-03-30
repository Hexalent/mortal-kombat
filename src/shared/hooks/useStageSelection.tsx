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

  const stageNumberByKeyCode = (code: string): number | undefined => KEY_STAGE[code]

  const applyStageSelection = useCallback(
    (event: KeyboardEvent): void => {
      const nextActiveStage = !selectedStage && stages.find(stage => stage.number === stageNumberByKeyCode(event.code))
      if (nextActiveStage) {
        setActiveStage(nextActiveStage)
      }
    },
    [selectedStage, setActiveStage, stages]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      const action = ACTIONS_MAP[event.code]
      if (!selectedStage && action === 'APPLY') {
        selectStage(activeStage as Stage)
      } else if (action === 'ESCAPE') {
        unselectStage()
      } else {
        applyStageSelection(event)
      }
    },
    [activeStage, applyStageSelection, selectStage, selectedStage, unselectStage]
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
  Enter: 'APPLY',
  Escape: 'ESCAPE'
}
