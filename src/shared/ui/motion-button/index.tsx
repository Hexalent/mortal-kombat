import { HTMLMotionProps, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import clsx from 'clsx'

type MotionButtonProps = PropsWithChildren<HTMLMotionProps<'button'>>
export const MotionButton = ({ children, className, ...props }: MotionButtonProps) => {
  const scaleUp = {
    hover: { scale: 1 },
    tap: { scale: 0.75 }
  }

  const transition = {
    type: 'spring',
    stiffness: 500,
    damping: 20
  }

  const buttonClasses = clsx(
    'rounded-md',
    'border-b-2',
    'font-immortal',
    'px-4',
    'py-1',
    'text-xl',
    'text-white',
    'shadow-md',
    'transition-all',
    'duration-300',
    'hover:bg-white',
    'hover:text-black',
    className
  )

  return (
    <motion.button
      className={buttonClasses}
      whileHover={scaleUp.hover}
      whileTap={scaleUp.tap}
      transition={transition}
      {...props}
    >
      {children}
    </motion.button>
  )
}
