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
  } = useContext(UserContext)

  const result = itemsShopingCart.reduce(
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
