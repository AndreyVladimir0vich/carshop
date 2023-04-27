import { useContext } from 'react'
import { Card } from '../Card/Card'
import { UserContext } from '../context/userContext'
import './index.css'

export const CardList = ({ cards }) => {
  const { handleProdAddDelLike } = useContext(UserContext)
  return (
    <div className="cards">
      {cards.map((item) => {
        return (
          <Card
            key={item._id}
            {...item}
            id={item._id}
            product={item}
            handleProdAddDelLike={handleProdAddDelLike}
          />
        )
      })}
    </div>
  )
}
