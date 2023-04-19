import { Form } from '../Form/Form'
import { useForm } from 'react-hook-form'
import { api } from '../utils/api'
import { openNotification } from '../Notifiaction/Notification'
import CloseIcon from '@mui/icons-material/Close'

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

  // Функция для отправки формы
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
          className="form_edit_container"
          title={'Редактировать товар'}
          submitForm={handleSubmit(updateProduct)}
        >
          <div className="edit_input_wrapper">
            <span className="edit_input_title">Название</span>
            <input
              type="text"
              className="edit_form_input"
              defaultValue={product.name}
              placeholder="Название"
              {...register('name', { required: true })}
            />
          </div>

          <div className="edit_input_wrapper">
            <span className="edit_input_title">Цена</span>
            <input
              type="number"
              min="0"
              className="edit_form_input"
              defaultValue={product.price}
              placeholder="Цена"
              {...register('price', { required: true })}
            />
          </div>

          <div className="edit_input_wrapper">
            <span className="edit_input_title">URL изображения</span>
            <input
              type="text"
              className="edit_form_input"
              defaultValue={product.pictures}
              placeholder="URL изображения"
              {...register('pictures', { required: true })}
            />
          </div>

          <div className="edit_input_wrapper">
            <span className="edit_input_title">Скидка</span>
            <input
              type="number"
              min="0"
              max="99"
              className="edit_form_input"
              defaultValue={product.discount}
              placeholder="Скидка"
              {...register('discount', { required: true })}
            />
          </div>

          <div className="edit_input_wrapper">
            <span className="edit_input_title">Описание</span>
            <textarea
              className="edit_form_textarea"
              defaultValue={product.description}
              placeholder="Описание"
              {...register('description')}
            />
          </div>

          <button className="edit_btn_submit" type="submit">
            Отправить
          </button>
        </Form>
      </div>
    </div>
  )
}
