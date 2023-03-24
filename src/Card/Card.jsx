import { ReactComponent as Like } from './like.svg'
import './index.css'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { findLike } from '../utils/utils'

export const Card = ({
  product,
  pictures,
  name,
  discount,
  price,
  setParentCounter,
  handleProductLike,
}) => {
  const { currentUser } = useContext(UserContext)
  const calcDiscountPrice = Math.round(price - (price * discount) / 100)
  const isLiked = findLike(product, currentUser)

  const handleLikeClick = () => {
    handleProductLike(product)
  }

  return (
    <div className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && (
          <span className="card__discount">{`-${discount}%`}</span>
        )}
      </div>

      <div className="card__sticky card__sticky_type_top-right">
        <button
          className={cn('card__favorite', {
            'card__favorite_is-active': isLiked,
          })}
          onClick={handleLikeClick}
        >
          <Like />
        </button>
      </div>

      <Link to={`/product/${product._id}`} className="card__link">
        <img src={pictures} alt="Картинка" className="card__image" />
        <div className="card__desc">
          <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>
            {price}&nbsp;у.е.
          </span>
          {discount !== 0 && (
            <span className="card__price card__price_type_discount">
              {calcDiscountPrice}&nbsp;у.е.
            </span>
          )}
          {/* <span className='card_weight'>1pc</span> */}
          <p className="card__name">{name}</p>
        </div>
      </Link>

      <span
        onClick={() => setParentCounter((state) => state + 1)}
        className="card__card btn btn_type_primary"
      >
        В корзину
      </span>
    </div>
  )
}
