import { Suspense } from 'react'
import { Audio, GoBackButton, Loader } from '@/shared/ui'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { settingsSelectors } from '@/entities/settings'

export const BasicLayout = () => {
  const location = useLocation()
  const isStartRoute = location.pathname === '/'
  const isHeroView = location.pathname === '/fighter-view'
  const isSoundEnabled = settingsSelectors.use.isSoundEnabled()

  return (
    <div className='relative mx-auto min-h-screen overflow-hidden bg-black'>
      {isStartRoute ? null : <GoBackButton />}
      {isSoundEnabled && !isHeroView ? <Audio /> : null}
      <AnimatePresence mode='wait'>
        <motion.div
          key={location.pathname}
          initial='initialState'
          animate='animateState'
          transition={{
            duration: 0.75,
            delay: 0.1,
            ease: 'easeInOut'
          }}
          variants={{
            initialState: {
              opacity: 0,
              y: 25
            },
            animateState: {
              opacity: 1,
              y: 0
            }
          }}
        >
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
