import { MotionPage } from '@/shared/ui'
import { Heading } from '@/shared/ui/heading'
import { useNavigate } from 'react-router-dom'

export const Battle = () => {
  const navigate = useNavigate()
  const newGame = () => navigate('/')
  return (
    <MotionPage className='relative flex h-screen min-h-screen flex-col items-center justify-center bg-[url(/public/background/bg.jpg)] bg-cover bg-center bg-no-repeat'>
      <Heading className='absolute top-60'>BATTLE</Heading>
      <button
        onClick={newGame}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded border border-gray-400 bg-white py-2 px-4 font-immortal text-2xl text-gray-800 shadow hover:bg-gray-100'
      >
        New Game
      </button>
    </MotionPage>
  )
}
