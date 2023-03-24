import { Suspense } from 'react'
import { Loader } from '@/shared/ui'
import { Outlet } from 'react-router-dom'
export const BasicLayout = () => {
  return (
    <div className='container mx-auto px-4'>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
