import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { ShoppingCard } from '../ShopingCart/ShopingCart'

const ShopingCartPage = () => {
  const { navigate } = useContext(UserContext)
  return (
    <div>
      <button className="btn" onClick={() => navigate('/')}>
        В каталог
      </button>
      <div>
        <ShoppingCard />
      </div>
    </div>
  )
}

export default ShopingCartPage
