import React, { useContext } from 'react'

import { CardList } from '../CardList/CardList'
import { UserContext } from '../context/userContext'
import s from './Page404.module.css'
import { BaseButton } from '../BaseButton/BaseButton'

const FavouritesPage = () => {
  const { favourites, navigate } = useContext(UserContext)
  return (
    <>
      <BaseButton color={'yellow'} onClick={() => navigate('/')}>
        в каталог
      </BaseButton>
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
