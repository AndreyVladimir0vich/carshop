import { useContext } from 'react'
import { Card } from '../Card/Card'
import { UserContext } from '../context/userContext'
import './index.css'

export const CardList = () => {
  const { cards, handleProductLike, setParentCounter } = useContext(UserContext)
  return (
    <div className="cards">
      {cards.map((item) => {
        return (
          <Card
            key={item._id}
            {...item}
            product={item}
            handleProductLike={handleProductLike}
            setParentCounter={setParentCounter}
          />
        )
      })}
    </div>
  )
}
