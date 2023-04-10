import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { BaseButton } from '../BaseButton/BaseButton'
import s from './Page404.module.css'

const Userpage = () => {
  const { currentUser, navigate } = useContext(UserContext)

  return (
    <>
      <div className={s.notfound}>
        {currentUser.email && <span>Почта: {currentUser.email}</span>} <br></br>
        {currentUser.email && <span>Имя: {currentUser.name}</span>} <br></br>
        {currentUser.about ? <span>Роль: {currentUser.about}</span> : null}{' '}
      </div>

      <BaseButton onClick={() => navigate('/')}>В каталог</BaseButton>
    </>
  )
}

export default Userpage
