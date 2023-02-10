import { MutableRefObject, useEffect, useState } from 'react'

export interface IntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

export interface IntersectionObserver {
  isIntersecting: boolean
  intersectionRatio: number
}

const useIntersection = (
  elementRef: MutableRefObject<Element | null>,
  options: IntersectionObserverOptions
): IntersectionObserver | null => {
  const [intersectionObserver, setIntersectionObserver] = useState<IntersectionObserver | null>(null)

  useEffect(() => {
    const intersectionObserverCallback = (entries: IntersectionObserverEntry[]): void => {
      const [entry] = entries
      setIntersectionObserver({
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
      })
    }

    if (elementRef.current) {
      const observer = new IntersectionObserver(
        intersectionObserverCallback,
        options
      )
      observer.observe(elementRef.current)
      return (): void => observer.disconnect()
    }

    return (): void => { }
  }, [elementRef, options])

  return intersectionObserver
}

export default useIntersection