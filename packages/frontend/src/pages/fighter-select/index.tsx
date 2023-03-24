import { MotionPage } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { heroesSelectors } from '@/entities'
import { Routes } from '@/shared/configs'
import { Character, getCharacters } from '@/shared/lib/images'

export const FighterSelect = () => {
  const navigate = useNavigate()
  const selectedHeroes = heroesSelectors.use.selectedHeroes()
  const activeHero = heroesSelectors.use.activeHero()
  const setActiveHero = heroesSelectors.use.setActiveHero()
  const selectHero = heroesSelectors.use.selectHero()

  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    getCharacters().then(res => setCharacters(res))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
          if (activeHero?.number && activeHero.number < 15) {
            const newActiveHero = characters.find(hero => hero.number === activeHero.number + 10)
            if (newActiveHero) setActiveHero(newActiveHero)
          }
          break

        case 'ArrowDown':
          if (activeHero?.number && activeHero.number > 4) {
            const newActiveHero = characters.find(hero => hero.number === activeHero.number - 10)
            if (newActiveHero) setActiveHero(newActiveHero)
          }
          break

        case 'ArrowLeft':
          if (activeHero?.number && activeHero.number !== 0) {
            const newActiveHero = characters.find(hero => hero.number === activeHero.number - 1)
            if (newActiveHero) setActiveHero(newActiveHero)
          }
          break

        case 'ArrowRight':
          if (activeHero?.number && activeHero.number !== 14) {
            const newActiveHero = characters.find(hero => hero.number === activeHero.number + 1)
            if (newActiveHero) setActiveHero(newActiveHero)
          }
          break

        case 'Enter':
          if (selectedHeroes.length < 2 && activeHero) {
            selectHero(activeHero)
            setActiveHero(selectedHeroes.length === 0 ? characters[0] : characters[1])
          }
          break

        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeHero, characters, selectHero, selectedHeroes, setActiveHero])

  const start = () => {
    if (selectedHeroes.length === 2) {
      navigate('/' + Routes.FIGHTER_VIEW)
    }
  }

  return (
    <MotionPage>
      <div className='flex h-screen w-screen items-center justify-center bg-[url(/public/background/bg.jpg)] bg-cover bg-center bg-no-repeat p-4'>
        <div className='relative grid h-full max-h-[600px] w-full max-w-[850px] grid-cols-5 grid-rows-3 items-center justify-center overflow-hidden'>
          {characters.map(character => (
            <div className='flex items-end justify-end' key={character.title}>
              <img
                src={character.img}
                className={`object-fit relative h-[200px] w-full bg-stone-800 shadow-sm ${
                  selectedHeroes.some(hero => hero.number === character.number)
                    ? `border-4 border-solid border-${selectedHeroes.indexOf(character) === 0 ? 'white' : 'green'}-600`
                    : activeHero?.number === character.number
                    ? 'border-4 border-solid border-white'
                    : ''
                }`}
                alt={`Hero ${character.title}`}
              />
            </div>
          ))}
        </div>
        {selectedHeroes.length >= 1 && (
          <div className='absolute bottom-1 left-10'>
            <img src={selectedHeroes[0].gif} alt='Hero gif' className='object-fit h-[300px]' />
          </div>
        )}
        {selectedHeroes.length === 2 && (
          <div className='absolute bottom-1 right-10'>
            <img
              src={selectedHeroes[1].gif}
              alt='Hero gif'
              className='object-fit h-[300px]'
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        )}
        {selectedHeroes.length === 2 && (
          <button
            onClick={start}
            className='absolute bottom-4 rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100'
          >
            START FIGHT
          </button>
        )}
      </div>
    </MotionPage>
  )
}
