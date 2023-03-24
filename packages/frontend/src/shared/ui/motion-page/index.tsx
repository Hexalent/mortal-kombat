import { HTMLMotionProps, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

type MotionPageProps = HTMLMotionProps<'div'>

export const MotionPage = ({ children, ...props }: PropsWithChildren<MotionPageProps>) => {
  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
