import { useEffect, useRef } from 'react'

const useClickOutside = <T extends Element>(callback: (ref: T) => void) => {
  const ref = useRef<T>(null)

  const handleClickOutside = (event: MouseEvent) => {
    const result = ref.current && !ref.current.contains(event.target as Node)
    if (result) {
      callback(ref.current)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return ref
}



export default useClickOutside