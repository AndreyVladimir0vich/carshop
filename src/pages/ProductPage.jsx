import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../Product/Product'
import { api } from '../utils/api'

export const ProductPage = () => {
  const id = useParams()

  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!id?.productId) return
    api.getProductById(id?.productId).then((data) => setProduct(data))
  }, [id?.productId])

  return product ? (
    <Product product={product} id={id.productId} />
  ) : (
    <div>Загрузка</div>
  )
}
