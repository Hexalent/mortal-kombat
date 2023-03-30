import { settingsSelectors } from '@/entities/settings'
import { useAudio } from '@/shared/hooks'

export const HeroSelectionHint = () => {
  const isSoundTrackEnabled = settingsSelectors.use.isSoundTrackEnabled()
  const { playAudio } = useAudio()

  const onHintShow = () => {
    if (isSoundTrackEnabled) {
      playAudio()
    }
  }

  return (
    <>
      <div className='absolute right-20 top-5 z-10'>
        <label htmlFor='hint' className='kbd kbd-md cursor-pointer' onClick={onHintShow}>
          Stage
        </label>

        <input type='checkbox' id='hint' className='modal-toggle' />
        <div className='modal'>
          <div className='modal-box bg-[#101010]'>
            <h3 className='text-xl text-white'>Stage controls</h3>
            <div className='flex justify-between py-3'>
              <div className='space-y-2 px-4 py-2'>
                <p className='mb-3'>
                  Use the keys (<kbd className='kbd kbd-sm'>Q</kbd>, <kbd className='kbd kbd-sm'>W︎</kbd>,
                  <kbd className='kbd kbd-sm'>E</kbd>, <kbd className='kbd kbd-sm'>R</kbd>,{' '}
                  <kbd className='kbd kbd-sm'>T</kbd> , <kbd className='kbd kbd-sm'>Y</kbd>) to select stage and
                  <kbd className='kbd kbd-sm'>Esc</kbd> to deselect it.
                </p>
              </div>
            </div>
            <div className='modal-action m-0'>
              <label htmlFor='hint' className='btn-xs btn bg-none text-sm text-white'>
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
