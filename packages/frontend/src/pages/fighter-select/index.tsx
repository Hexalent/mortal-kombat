import { MotionPage } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { getImages, TCharactersObj } from '@/shared/lib/images/getImages'

export const FighterSelect = () => {
  const [characters, setCharacters] = useState<TCharactersObj[]>([])
  useEffect(() => {
    getImages().then(res => setCharacters(res))
  }, [])
  console.log(characters)
  return (
    <MotionPage>
      <div className='flex h-screen w-screen items-center justify-center bg-[url(/public/background/bg.jpg)] bg-cover bg-center bg-no-repeat p-4'>
        <div className='grid h-full max-h-[600px] w-full max-w-[850px] grid-cols-5 grid-rows-3 items-center justify-center overflow-hidden'>
          {characters.map(character => (
            <div className='flex items-end justify-end'>
              <img
                src={character.img}
                className='object-fit relative h-[200px] w-full bg-stone-800 shadow-sm'
                key={character.title}
              />
            </div>
          ))}
        </div>
      </div>
    </MotionPage>
  )
}
