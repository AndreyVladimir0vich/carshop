import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { BaseButton } from '../BaseButton/BaseButton'
import { api } from '../utils/api'
import { Form } from '../Form/Form'
import { useForm } from 'react-hook-form'
import { openNotification } from '../Notifiaction/Notification'
import s from './Userpage.module.css'

const Userpage = () => {
  const { currentUser, setCurrentUser, setIsAuthentificated, navigate } =
    useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' })

  const sendAvatar = async ({ avatar }) => {
    try {
      const newUser = await api.updateAvatar({ avatar: avatar })

      setCurrentUser({ ...newUser })
      console.log('work1')
      openNotification('success', 'Успешно', 'Автар успешно изменен')
    } catch (error) {
      openNotification('error', 'error', 'Не удалось изменить данные')
    }
  }

  const sendProfileData = async (data) => {
    try {
      const newUser = await api.updateUserInfo({
        name: data.name,
        about: data.about,
      })
      setCurrentUser({ ...newUser })
      openNotification('success', 'Успешно', 'Данные успешно изменены')
    } catch (error) {
      openNotification('error', 'error', 'Не удалось изменить данные')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthentificated(false)
    navigate('/login')
  }

  return (
    <>
      <div className={s.userpage}>
        <h1>Мои данные</h1>
        <p>Ваш email: {currentUser?.email}</p>

        <img className={s.user__ava} src={currentUser.avatar}></img>
        <p>Ваш ID: {currentUser?._id}</p>
        <Form className={s.userpage} submitForm={handleSubmit(sendAvatar)}>
          <input
            {...register('avatar')}
            defaultValue={currentUser?.avatar}
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
            defaultValue={currentUser.name}
            className={s.userPage__inputs}
            type="text"
            placeholder="name"
          />
          <input
            className={s.userPage__inputs}
            defaultValue={currentUser.about}
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

export default Userpage
