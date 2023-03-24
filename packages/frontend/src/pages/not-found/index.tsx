import { useNavigate } from 'react-router-dom'
import { MotionPage } from '@/shared/ui'

export const NotFound = () => {
  const navigate = useNavigate()

  const handleBackToLogin = () => {
    navigate('/')
  }

  return (
    <MotionPage className='flex h-screen flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold'>404</h1>
      <p className='text-xl'>Page not found</p>
      <div className='mt-5 flex items-center justify-center gap-x-6' onClick={handleBackToLogin}>
        <span className='cursor-pointer rounded-md py-0.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          Back game <span aria-hidden='true'>→</span>
        </span>
      </div>
    </MotionPage>
  )
}
