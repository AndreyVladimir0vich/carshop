import { useForm } from 'react-hook-form'
import { Form } from '../Form/Form'
import { BaseButton } from '../BaseButton/BaseButton'
import { api } from '../utils/api'
import { openNotification } from '../Notifiaction/Notification'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import './style.scss'

export const FormAddProd = ({ setCreateModal }) => {
  const [discountIsChecked, setdiscountIsChecked] = useState(false)

  const checkDiscountHandler = () => {
    setdiscountIsChecked(!discountIsChecked)
  }

  const navigate = useNavigate()

  const { cards, setCards } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' })

  const addProd = async (data) => {
    try {
      const result = await api.addNewProduct({ ...data })

      setCards([...cards, result])
      navigate('/')
      setCreateModal(false)
      openNotification('success', 'Успешно', 'Товар успешно добавлен')
    } catch (error) {
      openNotification('error', 'Ошибка', 'Товар добавить не удалось')
      console.log({ error })
    }
  }

  return (
    <div className="add_product_container">
      <div className="add_good_close_icon_wrapper">
        <span
          className="add_good_close_icon"
          onClick={() => {
            setCreateModal(false)
          }}
        >
          <CloseIcon style={{ fontSize: '18px' }} />
        </span>
      </div>

      <div>
        <Form title={'Добавить товар'} submitForm={handleSubmit(addProd)}>
          <input
            type="text"
            className="auth__input"
            placeholder="Название"
            {...register('name', { required: true })}
          />
          <input
            type="text"
            className="auth__input"
            placeholder="Описание"
            {...register('description')}
          />
          <input
            type="number"
            min="0"
            className="auth__input"
            placeholder="Цена"
            {...register('price', { required: true })}
          />
          <input
            type="text"
            className="auth__input"
            placeholder="URL изображения"
            {...register('pictures', { required: true })}
          />

          <div className="form_add_checkboxes_container">
            <label>
              <input
                type="checkbox"
                checked={discountIsChecked}
                onChange={checkDiscountHandler}
              />{' '}
              Добавить скидку
            </label>
            {discountIsChecked && (
              <input
                type="number"
                min="1"
                max="99"
                className="auth__input"
                defaultValue={0}
                placeholder="Скидка"
                {...register('discount', { required: true })}
              />
            )}
          </div>

          <BaseButton color={'yellow'} type="submit">
            Отправить
          </BaseButton>
        </Form>
      </div>
    </div>
  )
}
