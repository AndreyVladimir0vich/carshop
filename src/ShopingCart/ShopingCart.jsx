import React, { useContext } from 'react'
import { ItemsTable } from './ItemsTable.jsx'
import { UserContext } from '../context/userContext.js'
import './shoppingcard.scss'
import './itemstable.scss'

export const ShoppingCard = () => {
  const {
    itemsShopingCart,
    setItemsShopingCart,
    handleIncreaseCount,
    handleDecreaseCount,
    cards,
  } = useContext(UserContext)

  const prodIdInCards = cards.map((i) => i._id)

  const result = itemsShopingCart
    .filter((item) => prodIdInCards.includes(item.id))
    .reduce(
      (previousValue, currentItem) =>
        previousValue + currentItem.price * currentItem.count,
      0
    )

  const handleRemoveItem = (id) => {
    setItemsShopingCart(itemsShopingCart.filter((item) => item.id !== id))
  }

  return (
    <>
      <h1>Корзина</h1>
      {itemsShopingCart.length ? (
        <ItemsTable
          prodIdInCards={prodIdInCards}
          result={result}
          items={itemsShopingCart}
          removeItem={handleRemoveItem}
          increaceCount={handleIncreaseCount}
          decreaceCount={handleDecreaseCount}
        />
      ) : (
        <div className="empty-text">У вас нет еще товаров в корзине</div>
      )}
    </>
  )
}
