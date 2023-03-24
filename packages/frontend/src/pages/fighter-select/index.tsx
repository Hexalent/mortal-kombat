import { MotionPage } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { getImages, TCharactersObj } from '@/shared/lib/images/getImages'

export const FighterSelect = () => {
  const [characters, setCharacters] = useState<TCharactersObj[]>([])
  const [active, setActive] = useState<number>(0)

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.code === 'ArrowUp') {
      if (active < 5) return
      setActive(active - 5)
    }

    if (event.code === 'ArrowDown') {
      if (active > 9) return
      setActive(active + 5)
    }

    if (event.code === 'ArrowLeft') {
      if (active === 0) {
        setActive(14)
        return
      }
      if (active < 1) return
      setActive(active - 1)
    }

    if (event.code === 'ArrowRight') {
      if (active === 14) {
        setActive(0)
        return
      }
      if (active > 13) return
      setActive(active + 1)
    }
  }

  useEffect(() => {
    getImages().then(res => setCharacters(res))
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [keyDownHandler])

  return (
    <MotionPage>
      <div className='flex h-screen w-screen items-center justify-center bg-[url(/public/background/bg.jpg)] bg-cover bg-center bg-no-repeat p-4'>
        <div className='grid h-full max-h-[600px] w-full max-w-[850px] grid-cols-5 grid-rows-3 items-center justify-center overflow-hidden'>
          {characters.map(character => (
            <div className='flex items-end justify-end' key={character.title}>
              <img
                src={character.img}
                className={`object-fit relative h-[200px] w-full bg-stone-800 shadow-sm ${
                  character.number === active ? 'border-2 border-solid border-green-600' : 'border-none'
                } `}
                alt={`Hero ${character.title}`}
              />
            </div>
          ))}
        </div>
      </div>
    </MotionPage>
  )
}
