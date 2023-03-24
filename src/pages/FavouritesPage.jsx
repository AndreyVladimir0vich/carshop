import React, { useContext } from 'react'

import { CardList } from '../CardList/CardList'
import { UserContext } from '../context/userContext'
import s from './Page404.module.css'

const FavouritesPage = () => {
  const { favourites, navigate } = useContext(UserContext)
  return (
    <>
      <button className="btn" onClick={() => navigate('/')}>
        В каталог
      </button>
      <h1>Избранное</h1>
      {!!favourites.length ? (
        <CardList cards={favourites} />
      ) : (
        <div className={s.notfound}>Избранных товаров нет</div>
      )}
    </>
  )
}

export default FavouritesPage
