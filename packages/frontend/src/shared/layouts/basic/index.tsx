import { Suspense } from 'react'
import { Loader } from '@/shared/ui'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export const BasicLayout = () => {
  const location = useLocation()

  return (
    <div className='mx-auto'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={location.pathname}
          initial='initialState'
          animate='animateState'
          exit='exitState'
          transition={{
            duration: 0.75
          }}
          variants={{
            initialState: {
              opacity: 0,
              y: 25,
              scale: 0.9,
              rotate: -5
            },
            animateState: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0
            },
            exitState: {
              opacity: 0,
              y: -25,
              scale: 0.9,
              rotate: 5
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
