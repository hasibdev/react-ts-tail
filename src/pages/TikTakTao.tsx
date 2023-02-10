import { FC, ReactNode, useState, useRef } from 'react'
import { useLocalStorage } from '../hooks';

type Props = {}

enum PlayerType {
  "X" = "X",
  "O" = "O",
}

const TikTakTao: FC = (props: Props) => {
  const [squars, setSquars] = useLocalStorage<Array<PlayerType | null>>('squars', Array(9).fill(null))
  // const [squars, setSquars] = useState<Array<PlayerType | null>>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(PlayerType.X);

  const [winner, setWinner] = useState<PlayerType | null>(null);


  const onReset = () => {
    setSquars(Array(9).fill(null))
    setCurrentPlayer(PlayerType.X)
    setWinner(null)
  }

  const handleClick = (index: number) => {
    if (squars[index] || winner) {
      return
    }

    const prevCopy = [...squars]
    prevCopy[index] = currentPlayer
    setSquars(prevCopy)

    if (checkWin(prevCopy, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === PlayerType.X ? PlayerType.O : PlayerType.X);
    }

  }

  function checkWin(board: (PlayerType | null)[], player: PlayerType) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let result = false
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i]

      result = board[a] === player && board[b] === player && board[c] === player
      if (result) {
        break
      }
    }
    return result;

  }

  const renderSquare = (index: number) => (
    <button onClick={() => handleClick(index)} className='w-20 h-20 bg-slate-50 border m-0 p-0'>
      {squars[index]}
    </button>)

  return (
    <div className='mt-10'>
      <h2 className='mb-5'>TikTakTao</h2>
      {
        winner ? <h3>Winer is: {currentPlayer}</h3> : <h3>Next player: {currentPlayer}</h3>
      }
      <div>
        <div className='flex'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='flex'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='flex'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <button onClick={onReset} className='mt-10 px-3 py-2 rounded bg-teal-500'>Reset</button>
    </div>
  )
}

type BoxProp = {
  index: number;
  children: ReactNode;
  onClick: (index: number) => void
}
function Box(props: BoxProp) {
  return (
    <button onClick={() => props.onClick(props.index)} className='w-20 h-20 bg-slate-50 border m-0 p-0'>{props.children}</button>
  )
}

export default TikTakTao