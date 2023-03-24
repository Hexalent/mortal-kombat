import { memo } from 'react'
import { Character } from '@/shared/lib/images'
import { ImageWithFallback } from '@/shared/ui'

type HeroImageProps = { hero: Character; isActive: boolean; isSelected: boolean }

export const HeroImage = memo(({ hero, isActive, isSelected }: HeroImageProps) => {
  const borderClass = isSelected
    ? `border-4 border-solid border-${isActive ? 'white' : 'green'}-600`
    : isActive
    ? 'border-4 border-solid border-white'
    : ''

  return (
    <div className='flex items-end justify-end'>
      <ImageWithFallback
        src={hero.img}
        alt={`Hero ${hero.title}`}
        className={`relative bg-stone-800 object-contain shadow-sm ${borderClass}`}
      />
    </div>
  )
})

HeroImage.displayName = 'HeroImage'
