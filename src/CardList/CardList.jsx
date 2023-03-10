import { Card } from '../Card/Card'
import './index.css'

export const CardList = ({
  cards,
  handleProductLike,
  currentUser,
  setParentCounter,
}) => {
  return (
    <div className="cards">
      {cards.map((item) => {
        return (
          <Card
            key={item._id}
            {...item}
            currentUser={currentUser}
            product={item}
            onProductLike={handleProductLike}
            setParentCounter={setParentCounter}
          />
        )
      })}
    </div>
  )
}
