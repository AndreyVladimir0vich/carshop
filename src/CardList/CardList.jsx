import { Card } from '../Card/Card'

import './index.css'

export const CardList = ({ cards }) => {
  return (
    <div className="cards">
      {cards.map((item) => {
        return <Card key={item._id} {...item} id={item._id} product={item} />
      })}
    </div>
  )
}
