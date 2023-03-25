import { useNavigate } from 'react-router-dom'

export const GoBackButton = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <button
      onClick={handleGoBack}
      className='btn absolute left-5 top-5 z-10 border-0 bg-transparent transition-all duration-300 hover:bg-transparent'
    >
      Back
    </button>
  )
}
