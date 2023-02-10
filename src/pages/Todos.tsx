import { FC, useEffect, useRef } from 'react'

type Props = {}

const Todos: FC = (props: Props) => {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      console.log(entries)

    })

    observer.observe(elRef.current!)

    return () => { }
  }, [])


  return (
    <div ref={elRef}>Todos</div>
  )
}

export default Todos