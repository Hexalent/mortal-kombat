import clsx from 'clsx'
import { settingsSelectors } from '@/entities/settings'

type SettingsButtonProps = {
  className?: string
}

export const SettingsButton = ({ className }: SettingsButtonProps) => {
  const buttonClasses = clsx(
    'rounded-md',
    'border-b-2',
    'cursor-pointer',
    'px-4',
    'py-1',
    'text-xl',
    'text-white',
    'shadow-md',
    'transition-all',
    'duration-300',
    'hover:bg-white',
    'hover:text-black',
    className
  )

  const areDetailsEnabled = settingsSelectors.use.areDetailsEnabled()
  const toggleDetailsVisibility = settingsSelectors.use.toggleDetailsVisibility()
  const isSoundEnabled = settingsSelectors.use.isSoundEnabled()
  const toggleSound = settingsSelectors.use.toggleSound()

  return (
    <div className='mt-4'>
      <label htmlFor='settings' className={buttonClasses}>
        Settings
      </label>

      <input type='checkbox' id='settings' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box bg-[#101010]'>
          <h3 className='text-xl text-white'>Settings</h3>
          <div className='flex justify-between py-3'>
            <div>Show hints and game info</div>
            <label className='swap'>
              <input
                type='checkbox'
                className='hidden'
                checked={areDetailsEnabled}
                onChange={toggleDetailsVisibility}
              />
              <div className='swap-on'>ON</div>
              <div className='swap-off'>OFF</div>
            </label>
          </div>
          <div className='flex justify-between py-3'>
            <div>Music icon</div>
            <label className='swap'>
              <input type='checkbox' className='hidden' checked={isSoundEnabled} onChange={toggleSound} />
              <div className='swap-on'>ON</div>
              <div className='swap-off'>OFF</div>
            </label>
          </div>
          <div className='modal-action'>
            <label htmlFor='settings' className='btn-xs btn bg-none text-sm text-white'>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
