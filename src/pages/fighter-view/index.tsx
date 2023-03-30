import { HeroSelectionHint, MotionPage } from '@/shared/ui'
import { heroesSelectors } from '@/entities'
import { motion } from 'framer-motion'
import { StageImage } from '@/shared/ui/stage-image'
import { useStageSelection } from '@/shared/hooks/useStageSelection'
import { Routes } from '@/shared/configs'
import { useNavigate } from 'react-router-dom'
import { settingsSelectors } from '@/entities/settings'

export const FighterView = () => {
  const navigate = useNavigate()
  const areDetailsEnabled = settingsSelectors.use.areDetailsEnabled()
  const selectedHeroes = heroesSelectors.use.selectedHeroes()
  const selectedStage = heroesSelectors.use.selectedStage()
  const activeStage = heroesSelectors.use.activeStage()
  const stages = heroesSelectors.use.stages()

  useStageSelection()

  const startFight = () => navigate(`/${Routes.BATTLE_VIEW}`)

  return (
    <MotionPage>
      <div className='relative h-screen w-screen'>
        <div
          className={`absolute -z-0 h-full w-full bg-cover bg-center bg-no-repeat blur-sm`}
          style={{
            backgroundImage: `url(${activeStage?.img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {areDetailsEnabled && <HeroSelectionHint />}
        <div className='relative flex h-full w-full items-end justify-between px-20'>
          <div className='absolute top-[50px] right-1/2 translate-x-1/2 font-immortal text-8xl font-bold text-white'>
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
          <div className='absolute bottom-2 left-1/2 mx-auto grid h-[200px] w-full max-w-[1000px] -translate-x-1/2 transform grid-cols-6 items-center justify-center overflow-hidden'>
            {stages.map(stage => (
              <div className='flex items-center justify-center' key={stage.img}>
                <StageImage
                  key={stage.title}
                  stage={stage}
                  isSelected={selectedStage?.number === stage.number}
                  isActive={selectedStage?.number ? false : activeStage?.number === stage.number}
                />
              </div>
            ))}
          </div>
          {selectedStage && (
            <button
              onClick={startFight}
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded border border-gray-400 bg-white py-2 px-4 font-immortal text-2xl text-gray-800 shadow hover:bg-gray-100'
            >
              START FIGHT
            </button>
          )}
        </div>
      </div>
    </MotionPage>
  )
}
