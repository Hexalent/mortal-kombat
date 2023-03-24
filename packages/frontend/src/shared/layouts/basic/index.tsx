import { Suspense } from 'react'
import { Loader } from '@/shared/ui'
import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export const BasicLayout = () => {
  return (
    <div className='container mx-auto px-4'>
      <AnimatePresence mode='popLayout'>
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
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
            },
            animateState: {
              opacity: 1,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
            },
            exitState: {
              clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)'
            }
          }}
          className='base-page-size'
        >
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
