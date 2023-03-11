import React, { useEffect, useState } from 'react'
import { Logo } from '../Logo/Logo'
import { Search } from '../Search/Search'
import IconBasket from './basketMaterial/BasketMaterial'
import './index.css'

export const Header = ({
  setSearchQuery,
  searchQuery,
  parentCounter = 0,
  user,
  handleUpdateUser,
}) => {
  const [counter, setCounter] = useState(parentCounter)

  useEffect(() => {
    setCounter((st) => st + 1)
  }, [parentCounter])

  // const handleClickButtonEdit = (event) => {
  //   event.preventDefault()
  //   handleUpdateUser({ name: 'Andrey', about: 'RazRab' })
  // }

  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            {/* <Basket /> */}
            <IconBasket count={counter} />
          </div>
          <div>
            {user.email && <span>{user.email}</span>}{' '}
            {user.email && <span>{user.name}</span>}{' '}
            {user.about ? <span>{user.about}</span> : null}{' '}
            {/* <button onClick={handleClickButtonEdit}>Изменить</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
