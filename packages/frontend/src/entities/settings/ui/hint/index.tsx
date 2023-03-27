import { settingsSelectors } from '@/entities/settings'
import { useAudio } from '@/shared/hooks'

export const SettingsHint = () => {
  const isSoundTrackEnabled = settingsSelectors.use.isSoundTrackEnabled()
  const { playAudio } = useAudio()

  const onHintShow = () => {
    if (isSoundTrackEnabled) {
      playAudio()
    }
  }

  return (
    <>
      <div className='absolute right-20 top-5'>
        <label htmlFor='hint' className='kbd kbd-md cursor-pointer' onClick={onHintShow}>
          Hint
        </label>

        <input type='checkbox' id='hint' className='modal-toggle' />
        <div className='modal'>
          <div className='modal-box bg-[#101010]'>
            <h3 className='text-xl text-white'>Hints and game info</h3>
            <div className='flex justify-between py-3'>
              <div className='space-y-2 px-4 py-2'>
                <p className='mb-3 text-white'>
                  Use the arrow keys (<kbd className='kbd kbd-sm text-black'>▲</kbd>,{' '}
                  <kbd className='kbd kbd-sm text-black'>◀︎</kbd>,<kbd className='kbd kbd-sm text-black'>▶︎</kbd>,{' '}
                  <kbd className='kbd kbd-sm text-black'>▼</kbd>) to navigate and
                  <kbd className='kbd kbd-sm text-black'>Esc</kbd> to deselect.
                </p>
                <div className='flex w-full items-center'>
                  <kbd className='kbd'>▲</kbd>
                  <p className='ml-3 text-white'>Move up</p>
                </div>
                <div className='flex w-full items-center'>
                  <kbd className='kbd'>◀︎</kbd>
                  <p className='ml-3 text-white'>Move left</p>
                </div>
                <div className='flex w-full items-center'>
                  <kbd className='kbd'>▶︎</kbd>
                  <p className='ml-3 text-white'>Move right</p>
                </div>
                <div className='flex w-full items-center'>
                  <kbd className='kbd'>▼</kbd>
                  <p className='ml-3 text-white'>Move down</p>
                </div>
                <div className='flex w-full items-center'>
                  <kbd className='kbd'>Enter</kbd>
                  <p className='ml-3 text-white'>Select hero</p>
                </div>
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
