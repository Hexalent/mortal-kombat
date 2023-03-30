import { useEffect, useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  fallbackSrc?: string
  alt: string
  className?: string
}

export const ImageWithFallback = ({ src, fallbackSrc, alt, className = '' }: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
  }, [src])

  const handleError = () => {
    setImageSrc(fallbackSrc ?? '')
  }

  return <img src={imageSrc} alt={alt} className={`h-[200px] w-full ${className}`} onError={handleError} />
}
