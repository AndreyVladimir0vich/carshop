import React, { useContext } from 'react'
import { ItemsTable } from './ItemsTable.jsx'
import { UserContext } from '../context/userContext.js'
import './shoppingcard.scss'

export const ShoppingCard = () => {
  const { itemsShopingCart, setItemsShopingCart } = useContext(UserContext)

  const result = itemsShopingCart.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.price * currentItem.count,
    0
  )

  const handleRemoveItem = (id) => {
    setItemsShopingCart(itemsShopingCart.filter((item) => item.id !== id))
  }

  const handleIncreaceCount = (id) => {
    setItemsShopingCart(
      itemsShopingCart.map((item) => {
        if (item.id === id) {
          item.count++
        }
        return item
      })
    )
  }

  const handleDecreaceCount = (id, count) => {
    if (count < 2) {
      handleRemoveItem(id)
    } else {
      setItemsShopingCart(
        itemsShopingCart.map((item) => {
          if (item.id === id) {
            item.count--
          }
          return item
        })
      )
    }
  }

  return (
    <>
      <h1>Корзина</h1>
      {itemsShopingCart.length ? (
        <ItemsTable
          result={result}
          items={itemsShopingCart}
          removeItem={handleRemoveItem}
          increaceCount={handleIncreaceCount}
          decreaceCount={handleDecreaceCount}
        />
      ) : (
        <div className="empty-text">У вас нет еще товаров в корзине</div>
      )}
    </>
  )
}
