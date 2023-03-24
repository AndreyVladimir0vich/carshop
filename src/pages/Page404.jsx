import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import s from './Page404.module.css'

const Page404 = () => {
  const { navigate } = useContext(UserContext)
  return (
    <div className={s.notfound}>
      <div>
        <h1>Страница не сушествует</h1>
      </div>
      <button className="btn" onClick={() => navigate('/')}>
        В каталог
      </button>
    </div>
  )
}

export default Page404
