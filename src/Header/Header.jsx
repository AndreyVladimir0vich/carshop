import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { Logo } from '../Logo/Logo'
import { Search } from '../Search/Search'
import IconBasket from './basketMaterial/BasketMaterial'
import { ReactComponent as FavouriteIcon } from './img/favorites.svg'
import { ReactComponent as UserIcon } from './img/profile.svg'
import s from './Header.module.css'
import './index.css'

export const Header = () => {
  const {
    currentUser,
    parentCounter,
    setSearchQuery,
    favourites,
    setShowModal,
    isAuthentificated,
  } = useContext(UserContext)
  const [counter, setCounter] = useState(parentCounter)

  useEffect(() => {
    setCounter((st) => st + 1)
  }, [parentCounter])

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
            <Search setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <IconBasket count={counter} />
          </div>
          <Link className={s.favouritesLink} to="/favourites">
            <FavouriteIcon />
            {favourites.length !== 0 && (
              <span className={s.iconBubble}>{favourites.length}</span>
            )}
          </Link>
          <div className={s.userIcon}>
            {!isAuthentificated ? (
              <Link
                to={'/login'}
                className="btn"
                onClick={() => setShowModal(true)}
              >
                Login
              </Link>
            ) : (
              <span onClick={handleLogout} className="btn">
                logout
              </span>
            )}
          </div>

          <div>
            {currentUser.email && <span>{currentUser.email}</span>}{' '}
            {currentUser.email && <span>{currentUser.name}</span>}{' '}
            {currentUser.about ? <span>{currentUser.about}</span> : null}{' '}
            {/* <button onClick={handleClickButtonEdit}>Изменить</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
