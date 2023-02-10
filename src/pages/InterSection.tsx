import { FC, useEffect, useRef } from 'react'
import Button from '../components/utils/Button'
import { useIntersection, useScrollLock } from '../hooks'

type Props = {}

const InterSection: FC = (props: Props) => {
  const scrollLocakStatus = useRef<boolean>(false)
  const firstElRef = useRef<HTMLDivElement>(null)
  const intersectionObserver = useIntersection(firstElRef, { threshold: 0.1 })

  const [lockScroll, unLockScroll] = useScrollLock()

  const stopScrolling = () => {
    scrollLocakStatus.current = !scrollLocakStatus.current
  }

  useEffect(() => {
    if (scrollLocakStatus.current) lockScroll()
    else unLockScroll()

    return () => {
      unLockScroll()
    }
  }, [scrollLocakStatus.current])


  return (
    <>
      <div  >
        <div className={`${intersectionObserver?.isIntersecting ? 'bg-gray-700' : 'bg-red-400'} h-screen`}></div>
      </div>

      <div className='my-5 flex justify-center'>
        <Button onClick={stopScrolling}>Stop Scroll</Button>
      </div>

      <div ref={firstElRef} className="h-screen bg-teal-600">
        {intersectionObserver?.isIntersecting
          ? 'I am intersecting'
          : 'I am not intersecting'}
      </div>
    </>
  )
}

export default InterSection