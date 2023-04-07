import cn from 'classnames'
import s from './index.module.css'
import React, { useContext } from 'react'
import truck from './image/truck.svg'
import quality from './image/quality.svg'
import { ReactComponent as Save } from './image/save.svg'
import { useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { findLike } from '../utils/utils'
import { Rating } from '../Rating/Rating'
import { api } from '../utils/api'

export const Product = ({ id, product }) => {
  const { currentUser, setParentCounter, navigate } = useContext(UserContext)

  const [rate, setRate] = useState(3)
  const [users, setUsers] = useState(3)
  const [currentRating, setCurrentRating] = useState(0)
  const [reviewsProduct, setReviewsProduct] = useState(
    product?.reviews.slice(0, 5) ?? []
  )

  const isLiked = findLike(product, currentUser)
  const calcDiscountPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  )

  useEffect(() => {
    if (!product?.reviews) return
    const rateAcc = product.reviews.reduce(
      (acc, el) => (acc = acc + el.rating),
      0
    )
    const accum = Math.floor(rateAcc / product.reviews.length)
    setRate(accum)
    setCurrentRating(accum)
  }, [product?.reviews])

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data))
  }, [])

  const getUser = (id) => {
    if (!users.length) return 'User'
    const user = users.find((e) => e._id === id)
    return user.name
  }

  return (
    <>
      <div>
        <span className="auth__info" onClick={() => navigate(-1)}>
          {' '}
          {'< '} Назад
        </span>
        <h1>{product.name}</h1>
        <div className={s.rateInfo}>
          <span>
            Art <b>2388907</b>
          </span>
          <Rating rate={rate} setRate={setRate} currentRating={currentRating} />
          <span>{product?.reviews?.length} отзывов</span>
        </div>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img
            className={s.img}
            src={product.pictures}
            alt={`Изображение продукта${product.name}`}
          />
          {product.tags?.map((e) => (
            <span className={`tag tag_type_${e}`}>{e}</span>
          ))}
        </div>

        <div className={s.desc}>
          {/* <span className={s.price}>{product.name}</span> */}
          <span
            className={
              product.discount !== 0 ? 'card__old-price' : 'card__price'
            }
          >
            {product.price}&nbsp;у.е.
          </span>
          {!!product.discount && (
            <span className={`${s.price} card__price_type_discount`}>
              {product.discount}&nbsp;%
            </span>
          )}
          {product.discount !== 0 && (
            <span className="card__price card__price_type_discount">
              {calcDiscountPrice}&nbsp;у.е.
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <span
              onClick={() => setParentCounter((state) => state + 1)}
              className="card__card btn btn_type_primary"
            >
              В корзину
            </span>
          </div>
          <button className={cn(s.favorite, { [s.favoriteActive]: isLiked })}>
            <Save />
            <span>{isLiked ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <button className="btn" onClick={() => navigate('/')}>
            В каталог
          </button>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Отзывы:</h2>
        {reviewsProduct.map((r) => (
          <div key={r._id} className={s.review}>
            <div className={s.review__author}>
              <div>
                <span>{getUser(r.author)}</span>{' '}
                <span className={s.review__date}>
                  {new Date(r.created_at).toLocaleString()}
                </span>
              </div>
              <Rating rate={r.rating} isEditable={false} />
            </div>
            <div className={s.text}>
              <span>{r.text}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
