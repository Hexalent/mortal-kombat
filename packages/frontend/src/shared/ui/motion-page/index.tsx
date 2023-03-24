import { HTMLMotionProps, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

type MotionPageProps = HTMLMotionProps<'div'>

export const MotionPage = ({ children, ...props }: PropsWithChildren<MotionPageProps>) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.2
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
