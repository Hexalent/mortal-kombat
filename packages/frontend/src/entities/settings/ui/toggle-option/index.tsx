type ToggleOptionProps = { label: string; isChecked: boolean; onChange: () => void }
export const ToggleOption = ({ label, isChecked, onChange }: ToggleOptionProps) => (
  <div className='flex justify-between py-3'>
    <div className='font-immortal'>{label}</div>
    <label className='swap'>
      <input type='checkbox' className='hidden' checked={isChecked} onChange={onChange} />
      <div className='swap-on font-immortal'>ON</div>
      <div className='swap-off font-immortal'>OFF</div>
    </label>
  </div>
)
