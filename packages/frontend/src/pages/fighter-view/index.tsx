import { MotionPage } from '@/shared/ui'
import { heroesSelectors } from '@/entities'
import { motion } from 'framer-motion'

export const FighterView = () => {
  const selectedHeroes = heroesSelectors.use.selectedHeroes()
  return (
    <MotionPage>
      <div className='h-screen w-screen'>
        <div className='absolute -z-0 h-full w-full bg-[url(https://www.teahub.io/photos/full/171-1716638_mortal-kombat-fire-dragon-mortal-kombat.jpg)] bg-cover bg-center bg-no-repeat blur-sm' />
        <div className='relative z-10 flex h-full w-full items-end justify-between px-20'>
          <div className='absolute top-[50px] right-1/2 translate-x-1/2 font-russo text-8xl font-bold text-white'>
            Battle
          </div>
          {selectedHeroes.map((hero, index) => (
            <motion.div
              key={hero.number}
              initial={{ x: index === 0 ? -200 : 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: index === 0 ? 0.8 : 1
              }}
            >
              <div key={hero.number}>
                <img src={hero.img} alt='img' className='max-h-[600px] transition hover:scale-110' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionPage>
  )
}
