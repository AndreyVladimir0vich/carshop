import './modalDelete.css'
import { api } from '../utils/api'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { openNotification } from '../Notifiaction/Notification'
import { UserContext } from '../context/userContext'
import { BaseButton } from '../BaseButton/BaseButton'

export const ModalDelete = ({ activeModal, children, setShowModal, id }) => {
  const navigate = useNavigate()

  const { setCards } = useContext(UserContext)

  //Удаление продукта
  const deleteProduct = async () => {
    try {
      await api.deleteProductById(id)
      navigate('/')
      setCards((state) => state.filter((e) => e._id !== id))
      openNotification('success', 'Успешно', 'Товар успешно удален')
    } catch (error) {
      openNotification('error', 'Ошибка', 'Товар удалить не удалось')
    }
  }

  return (
    <>
      <div
        className={cn('modal', { ['active']: activeModal })}
        onClick={() => setShowModal(false)}
      >
        <div
          className={cn('delete_modal_content', { ['active']: activeModal })}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Подтвердите удаление</h2>
          <div className="delete_modal_btns_container">
            <BaseButton
              className="delete_modal_btn"
              onClick={() => {
                deleteProduct(id)
                setShowModal(false)
              }}
            >
              Удалить
            </BaseButton>
            <BaseButton
              className="delete_modal_btn"
              onClick={() => {
                setShowModal(false)
              }}
            >
              Отмена
            </BaseButton>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
