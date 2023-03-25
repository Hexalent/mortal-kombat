import { HTMLMotionProps, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

type MotionButtonProps = PropsWithChildren<HTMLMotionProps<'button'>>
export const MotionButton = ({ children, ...props }: MotionButtonProps) => {
  const scaleUp = {
    hover: { scale: 1 },
    tap: { scale: 0.75 }
  }

  const transition = {
    type: 'spring',
    stiffness: 500,
    damping: 20
  }

  return (
    <motion.button
      className='mortal rounded-md px-4 py-2 text-white shadow-md transition-all duration-200 hover:border-b-2'
      whileHover={scaleUp.hover}
      whileTap={scaleUp.tap}
      transition={transition}
      style={{ fontFamily: 'MortalKombat' }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
