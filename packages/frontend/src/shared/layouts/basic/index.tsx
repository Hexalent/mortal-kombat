import { Suspense } from 'react'
import { Audio, Loader } from '@/shared/ui'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export const BasicLayout = () => {
  const location = useLocation()

  return (
    <div className='relative mx-auto min-h-screen overflow-hidden bg-black'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={location.pathname}
          initial='initialState'
          animate='animateState'
          exit='exitState'
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
          <Audio />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
