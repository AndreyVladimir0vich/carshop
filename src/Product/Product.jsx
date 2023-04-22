import cn from 'classnames'
import s from './index.module.css'
import React, { useContext } from 'react'
import truck from './image/truck.svg'
import quality from './image/quality.svg'
import { ReactComponent as Save } from './image/save.svg'
import { useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { Rating } from '../Rating/Rating'
import { api } from '../utils/api'
import { BaseButton } from '../BaseButton/BaseButton'
import { Form } from '../Form/Form'
import { useForm } from 'react-hook-form'
import { ReactComponent as BasketIcon } from './image/basket.svg'
import { EditProductForm } from '../EditProductForm/EditProductForm'
import { Modal } from '../Modal/Modal'
import { ModalDeleteProd } from '../ModalDeleteProd/ModalDeleteProd'

export const Product = ({
  id,
  onUpdateProduct,
  onProductLike,
  onSendReview,
  product,
}) => {
  const { currentUser, navigate, handleAddItemsShopingCart, itemsShopingCart } =
    useContext(UserContext)
  const [rate, setRate] = useState(3)
  const [currentRating, setCurrentRating] = useState(0)
  const [activeModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [reviewsProduct, setReviewsProduct] = useState(
    product?.reviews.slice(0, 5) ?? []
  )
  const calcDiscountPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  )
  const [showFormReview, setShowFormReview] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' })

  const sendReview = async (data) => {
    const newProd = await api.addReview(product._id, {
      text: data.review,
      rating: rate,
    })
    setReviewsProduct((state) => [...newProd.reviews])
    onSendReview(newProd)
    setShowFormReview(false)
    reset()
  }

  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id)
    setIsLikedProduct(isLiked)
  }, [product.likes])

  const [isLikedProduct, setIsLikedProduct] = useState(false)

  const onLike = (e) => {
    onProductLike(product)
  }

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

  const textRegister = register('review', { required: 'Отзыв Обязателен' })

  const deleteReview = async (id) => {
    const result = await api.deleteReview(product._id, id)
    setReviewsProduct(() => [...result.reviews])
  }

  const handleAddCartClick = () => {
    handleAddItemsShopingCart(product)
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
          <Rating rate={currentRating} setRate={() => {}} />
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
            {itemsShopingCart.some((e) => e.id === product._id) && (
              <span
                onClick={() => navigate('/shopingCart')}
                className="card__card btn btn_type_primary btn_green"
              >
                В корзине, перейти
              </span>
            )}

            {!itemsShopingCart.some((e) => e.id === product._id) && (
              <span
                onClick={handleAddCartClick}
                className="card__card btn btn_type_primary"
              >
                В корзину
              </span>
            )}
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isLikedProduct })}
            onClick={onLike}
          >
            <Save />
            <span>{isLikedProduct ? 'В избранном' : 'В избранное'}</span>
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
          <BaseButton
            className={s.add_review_btn}
            onClick={() => setShowModalEdit(true)}
          >
            Редактировать товар
          </BaseButton>

          <Modal activeModal={showModalEdit} setShowModal={setShowModalEdit}>
            <EditProductForm
              onUpdateProduct={onUpdateProduct}
              product={product}
              setShowModalEdit={setShowModalEdit}
              id={id}
            />
          </Modal>

          <div className={s.btns_top}>
            <ModalDeleteProd
              activeModal={activeModal}
              setShowModal={setShowModal}
              id={id}
            ></ModalDeleteProd>
            <BaseButton
              onClick={() => setShowModal(true)}
              className={s.delete_button}
            >
              Удалить{' '}
            </BaseButton>
          </div>

          <BaseButton onClick={() => navigate('/')}>в каталог</BaseButton>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        {/* <h2 className={s.title}>Характеристики</h2>
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
        </div> */}
      </div>
      <div>
        <BaseButton onClick={() => setShowFormReview(true)}>
          Добавить отзыв
        </BaseButton>
        <p> </p>
        {showFormReview && (
          <Form
            className={s.review__form}
            submitForm={handleSubmit(sendReview)}
          >
            <Rating rate={rate} isEditable={true} setRate={setRate} />
            <span>Оставте ваш отзыв</span>
            <textarea className={s.review__text} {...textRegister}></textarea>
            <BaseButton type="submit">Отправить отзыв</BaseButton>
          </Form>
        )}
        {reviewsProduct
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((r) => (
            <div key={r._id} className={s.review}>
              <div className={s.review__author}>
                <div className={s.review__info}>
                  <img src={r.author.avatar} className={s.review__avatar} />
                  <span>{r.author.name ?? 'User'}</span>
                  <span className={s.review__date}>
                    {new Date(r.created_at).toLocaleString()}
                  </span>
                  {currentUser._id === r.author._id && (
                    <BasketIcon
                      onClick={() => deleteReview(r._id)}
                      className={s.review__basket__icon}
                    ></BasketIcon>
                  )}
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
