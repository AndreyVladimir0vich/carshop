import { Form } from '../Form/Form'
import { useForm } from 'react-hook-form'
import { api } from '../utils/api'
import { openNotification } from '../Notifiaction/Notification'
import CloseIcon from '@mui/icons-material/Close'
import { BaseButton } from '../BaseButton/BaseButton'

export const EditProductForm = ({
  setShowModalEdit,
  id,
  onUpdateProduct,
  product,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' })

  const updateProduct = async (data) => {
    try {
      const newProduct = await api.updateProduct(id, { ...data })
      onUpdateProduct(newProduct)
      openNotification('success', 'Успешно', 'Данные товара успешно изменены')
      setShowModalEdit(false)
    } catch (error) {
      console.log({ error })
      openNotification(
        'error',
        'Ошибка',
        'Не удалось отредактировать данные товара'
      )
    }
  }
  return (
    <div className="add_product_container">
      <div className="add_good_close_icon_wrapper">
        <span
          className="add_good_close_icon"
          onClick={() => {
            setShowModalEdit(false)
          }}
        >
          <CloseIcon style={{ fontSize: '18px' }} />
        </span>
      </div>

      <div>
        <Form
          title={'Редактировать товар'}
          submitForm={handleSubmit(updateProduct)}
        >
          <div className="auth__controls">
            <span className="edit_input_title">Название</span>
            <input
              type="text"
              className="auth__input"
              defaultValue={product.name}
              placeholder="Название"
              {...register('name', { required: true })}
            />
          </div>

          <div className="auth__controls">
            <span className="edit_input_title">Цена</span>
            <input
              type="number"
              min="0"
              className="auth__input"
              defaultValue={product.price}
              placeholder="Цена"
              {...register('price', { required: true })}
            />
          </div>

          <div className="auth__controls">
            <span className="edit_input_title">URL изображения</span>
            <input
              type="text"
              className="auth__input"
              defaultValue={product.pictures}
              placeholder="URL изображения"
              {...register('pictures', { required: true })}
            />
          </div>

          <div className="auth__controls">
            <span className="edit_input_title">Скидка</span>
            <input
              type="number"
              min="0"
              max="99"
              className="auth__input"
              defaultValue={product.discount}
              placeholder="Скидка"
              {...register('discount', { required: true })}
            />
          </div>

          <div className="auth__controls">
            <span className="edit_input_title">Описание</span>
            <textarea
              className="edit_form_textarea"
              defaultValue={product.description}
              placeholder="Описание"
              {...register('description')}
            />
          </div>

          <div className="auth__actions">
            <BaseButton type="submit">
              <span>Отправить</span>
            </BaseButton>
          </div>
        </Form>
      </div>
    </div>
  )
}
