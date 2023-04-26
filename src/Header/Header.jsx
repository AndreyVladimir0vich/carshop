import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { Logo } from '../Logo/Logo'
import { Search } from '../Search/Search'
import { ReactComponent as FavouriteIcon } from './img/favorites.svg'
import { ReactComponent as LoginIcon } from './img/login.svg'
import { ReactComponent as ShoppingCart } from './img/shoppingcart.svg'
import { ReactComponent as AddProduct } from './img/addProd.svg'
import s from './Header.module.css'
import './index.css'
import { Modal } from '../Modal/Modal'
import { FormAddProd } from '../FormAddProd/FormAddProd'

export const Header = () => {
  const {
    currentUser,
    setSearchQuery,
    favourites,
    setShowModal,
    isAuthentificated,
    itemsShopingCart,
  } = useContext(UserContext)

  const navigate = useNavigate()
  const [isCreateModalActive, setCreateModal] = useState(false)
  const countArr = itemsShopingCart.map((item) => item.count)
  let sumProd = 0
  countArr.map((item) => (sumProd += item))

  return (
    <div className="header" id="head">
      <div className="containerHederFooter">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
            <Search setSearchQuery={setSearchQuery} />
          </div>
          <div className="header__bubble-link">
            <ShoppingCart
              className="shopping__cart"
              onClick={() => navigate('/shopingCart')}
            />
            {itemsShopingCart.length !== 0 && (
              <span className="header__bubble_shopp">{sumProd}</span>
            )}
          </div>
          <div>
            <Link to={'/favourites'} className="header__bubble-link">
              <FavouriteIcon />
              {favourites.length !== 0 && (
                <span className="header__bubble">{favourites.length}</span>
              )}
            </Link>
          </div>
          <div>
            <AddProduct
              className="shopping__cart"
              onClick={() => setCreateModal(true)}
            ></AddProduct>
          </div>

          <div className={s.userIcon}>
            {!isAuthentificated ? (
              <Link
                to={'/login'}
                className="btn"
                onClick={() => setShowModal(true)}
              >
                <LoginIcon></LoginIcon>
              </Link>
            ) : (
              <div>
                <Link to="/user">
                  <img className={s.user__ava} src={currentUser.avatar}></img>
                </Link>

                <div className="header_add_prod_button_wrapper">
                  {isCreateModalActive && (
                    <Modal
                      activeModal={isCreateModalActive}
                      setShowModal={setCreateModal}
                    >
                      <FormAddProd setCreateModal={setCreateModal} />
                    </Modal>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
