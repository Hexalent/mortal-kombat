import clsx from 'clsx'
import { settingsSelectors } from '@/entities/settings'
import { ToggleOption } from '../toggle-option'
import { useAudio } from '@/shared/hooks'

type SettingsButtonProps = {
  className?: string
}

export const SettingsButton = ({ className }: SettingsButtonProps) => {
  const { playAudio } = useAudio()

  const buttonClasses = clsx(
    'font-immortal',
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
  const isSoundEnabled = settingsSelectors.use.isSoundEnabled()
  const isSoundTrackEnabled = settingsSelectors.use.isSoundTrackEnabled()
  const toggleSetting = settingsSelectors.use.toggleSetting()

  return (
    <div className='mt-4'>
      <label
        htmlFor='settings'
        className={buttonClasses}
        onClick={() => {
          playAudio()
        }}
      >
        Settings
      </label>

      <input type='checkbox' id='settings' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box bg-[#101010]'>
          <h3 className='font-immortal text-xl text-white'>Settings</h3>
          <ToggleOption
            label='Show hints and game info'
            isChecked={areDetailsEnabled}
            onChange={() => toggleSetting('details')}
          />
          <ToggleOption label='Music icon' isChecked={isSoundEnabled} onChange={() => toggleSetting('sound')} />
          <ToggleOption
            label='Action soundtrack'
            isChecked={isSoundTrackEnabled}
            onChange={() => toggleSetting('soundtrack')}
          />
          <div
            className='modal-action'
            onClick={() => {
              playAudio()
            }}
          >
            <label htmlFor='settings' className='btn-xs btn bg-none font-immortal text-sm text-white'>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
