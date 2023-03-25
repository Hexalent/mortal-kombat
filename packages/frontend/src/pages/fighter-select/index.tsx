import { useCharacterSelection, useKeyboardEvents } from '@/shared/hooks'
import { HeroImage } from '@/shared/ui/hero-image'
import { Audio, MotionPage } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { heroesSelectors } from '@/entities'
import { Routes } from '@/shared/configs'

export const FighterSelect = () => {
  const navigate = useNavigate()
  const activeHero = heroesSelectors.use.activeHero()
  const characters = heroesSelectors.use.characters()
  const selectedHeroes = heroesSelectors.use.selectedHeroes()

  useCharacterSelection()
  useKeyboardEvents()

  const start = () => {
    if (selectedHeroes.length === 2) {
      navigate(`/${Routes.FIGHTER_VIEW}`)
    }
  }

  const isHeroSelected = selectedHeroes.length === 2

  return (
    <MotionPage>
      <Audio />
      <div className='flex h-screen w-screen items-center justify-center bg-[url(/public/background/bg.jpg)] bg-cover bg-center bg-no-repeat p-4'>
        <div className='relative grid h-full max-h-[600px] w-full max-w-[850px] grid-cols-5 grid-rows-3 items-center justify-center overflow-hidden'>
          {characters.map(hero => (
            <HeroImage
              key={hero.title}
              hero={hero}
              isSelected={selectedHeroes.some(selectedHero => selectedHero.number === hero.number)}
              isActive={activeHero?.number === hero.number && selectedHeroes.length < 2}
            />
          ))}
        </div>
        {
          <>
            <div className='absolute bottom-10 left-10'>
              <img
                src={selectedHeroes[0] ? selectedHeroes[0].gif : activeHero?.gif}
                alt='Hero gif'
                className='object-fit h-[300px]'
              />
            </div>
            <div className='absolute bottom-2 left-20 font-russo text-xl font-bold text-white'>
              {selectedHeroes[0] ? selectedHeroes[0].title.replace('_', ' ') : activeHero?.title.replace('_', ' ')}
            </div>
          </>
        }
        {selectedHeroes[0] && (
          <>
            <div className={'absolute bottom-10 right-10'}>
              <img
                src={selectedHeroes[1] ? selectedHeroes[1].gif : activeHero?.gif}
                alt='Hero gif'
                className='object-fit h-[300px]'
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
            <div className='absolute bottom-2 right-20 font-russo text-xl font-bold text-white'>
              {selectedHeroes[1] ? selectedHeroes[1].title.replace('_', ' ') : activeHero?.title.replace('_', ' ')}
            </div>
          </>
        )}
        {isHeroSelected && (
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
