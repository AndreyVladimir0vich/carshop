import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../Product/Product'
import { api } from '../utils/api'
import { UserContext } from '../context/userContext'

export const ProductPage = () => {
  const id = useParams()
  const { currentUser } = useContext(UserContext)
  const [product, setProduct] = useState(null)

  const onSendReview = (newProduct) => {
    setProduct({ ...newProduct })
  }

  useEffect(() => {
    if (!id?.productId) return
    api.getProductById(id?.productId).then((data) => setProduct(data))
  }, [id?.productId])

  return product && currentUser ? (
    <Product product={product} id={id.productId} onSendReview={onSendReview} />
  ) : (
    <div>Загрузка</div>
  )
}
