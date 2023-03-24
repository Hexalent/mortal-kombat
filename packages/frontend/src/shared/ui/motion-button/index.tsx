import { HTMLMotionProps, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

type MotionButtonProps = PropsWithChildren<HTMLMotionProps<'button'>>
export const MotionButton = ({ children, ...props }: MotionButtonProps) => {
  const scaleUp = {
    hover: { scale: 1.2 },
    tap: { scale: 0.9 }
  }

  const transition = {
    type: 'spring',
    stiffness: 500,
    damping: 20
  }

  return (
    <motion.button
      className='rounded-md bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700'
      whileHover={scaleUp.hover}
      whileTap={scaleUp.tap}
      transition={transition}
      {...props}
    >
      {children}
    </motion.button>
  )
}
