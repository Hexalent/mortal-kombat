import { memo } from 'react'
import { Stage } from '@/shared/lib/images'
import { ImageWithFallback } from '@/shared/ui'

type StageImageProps = { stage: Stage; isActive: boolean; isSelected: boolean }

export const StageImage = memo(({ stage, isActive, isSelected }: StageImageProps) => {
  const borderClass = isSelected
    ? `border-4 border-solid border-${isActive ? 'white' : 'green'}-600`
    : isActive
    ? 'border-4 border-solid border-white'
    : ''

  return (
    <div className='flex items-end justify-end'>
      <ImageWithFallback
        src={stage.img}
        alt={`Stage ${stage.title}`}
        className={`relative object-fill shadow-sm ${borderClass}`}
      />
    </div>
  )
})

StageImage.displayName = 'StageImage'
