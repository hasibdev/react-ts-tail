import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import TextareaControl from '../components/froms/TextareaControl'
import Button from '../components/utils/Button'
import { useClickOutside, useClipboard, useMediaQuery } from '../hooks'
import { debounce } from '../hooks/useDebounce'

type Props = {}

const Home: FC = (props: Props) => {
  const onSearch = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    console.log('Debounce: Search data from API', value)
  }

  const matchMd = useMediaQuery('(max-width: 768px)')
  const matchLg = useMediaQuery('(max-width: 1024px)')

  const text = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, voluptatum."
  const text2 = "Copy Dummy Text"
  const copyToClipboard = useClipboard()

  const outsideRef = useClickOutside<HTMLDivElement>((r) => {
    r.classList.remove('bg-teal-800')
    r.classList.add('bg-red-600')
  })

  return (
    <Styled>
      <div className={`mt-5 mb-40 ${matchMd ? 'bg-orange-500' : matchLg && 'bg-slate-600'} `}>
        <Button onClick={async () => copyToClipboard(text)} >Copy Text</Button>
        <p className='text-lg mb-4'>{text}</p>

        <Button onClick={async () => copyToClipboard(text2)} >Copy Text</Button>
        <p className='text-lg'>{text2}</p>

        <TextareaControl onChange={debounce(onSearch, 500)} />
      </div>

      <div ref={outsideRef} className='w-40 h-40 bg-teal-800'>
        Click Outside
      </div>
    </Styled>
  )
}

const Styled = styled.div`
  
`

export default Home