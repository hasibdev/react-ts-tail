import { useEffect, useState } from 'react'

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    if (mediaQueryList.matches !== matches) {
      setMatches(mediaQueryList.matches)
    }
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }
    mediaQueryList.addEventListener('change', handleChange)
    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [query, matches])

  return matches
}

export default useMediaQuery