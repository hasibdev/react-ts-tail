import { useLayoutEffect, useRef } from 'react'

const useScrollLock = (): [() => void, () => void] => {
  // const originalOverflow = useRef('')

  const lock = (): void => {
    document.body.style.overflow = 'hidden'
  }

  const unlock = (): void => {
    document.body.style.overflow = 'visible'
  }


  // useLayoutEffect(() => {
  //   const { body } = document
  //   originalOverflow.current = body.style.overflow
  //   // body.style.overflow = 'hidden'

  //   return () => {
  //     // body.style.overflow = originalOverflow.current
  //     unlock()
  //   }
  // }, [])

  return [lock, unlock]
}

export default useScrollLock