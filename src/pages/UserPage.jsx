import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { BaseButton } from '../BaseButton/BaseButton'
import { Form } from '../Form/Form'
import { useForm } from 'react-hook-form'
import s from './Userpage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { userUp } from '../storageRTK/userSlice'

export const Userpage = () => {
  const { setIsAuthentificatedUser, navigate } = useContext(UserContext)
  const actualUser = useSelector((slice) => slice.user.data)
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' })
  const dispatch = useDispatch()

  const sendAvatar = async ({ avatar }) => {
    dispatch(userUp({ avatar: avatar }))
  }

  const sendProfileData = async (data) => {
    dispatch(userUp({ name: data.name, about: data.about }))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthentificatedUser(false)
    navigate('/login')
  }

  return (
    <>
      <div className={s.userpage}>
        <h1>Мои данные</h1>
        <p>Ваш email: {actualUser?.email}</p>

        <img
          className={s.user__ava}
          src={actualUser.avatar}
          alt="Аватар пользователя"
        ></img>
        <p>Ваш ID: {actualUser?._id}</p>
        <Form className={s.userpage} submitForm={handleSubmit(sendAvatar)}>
          <input
            {...register('avatar')}
            defaultValue={actualUser?.avatar}
            className={s.userPage__inputs}
            placeholder="Аватар"
          />
          <BaseButton type="submit">поменять аватар</BaseButton>
        </Form>
      </div>

      <div className={s.userpage}>
        <Form className={s.userpage} submitForm={handleSubmit(sendProfileData)}>
          <input
            {...register('name')}
            defaultValue={actualUser.name}
            className={s.userPage__inputs}
            type="text"
            placeholder="name"
          />
          <input
            className={s.userPage__inputs}
            defaultValue={actualUser.about}
            {...register('about')}
            placeholder="about"
          />

          <BaseButton type="submit">поменять имя и роль</BaseButton>
        </Form>
        <BaseButton onClick={() => navigate('/')}>в каталог</BaseButton>
        <BaseButton onClick={handleLogout}>Выйти</BaseButton>
      </div>
    </>
  )
}
