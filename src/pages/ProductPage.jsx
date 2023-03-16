import { useParams } from 'react-router-dom'
import { Product } from '../Product/Product'

export const ProductPage = () => {
  const id = useParams()

  return <Product id={id.productId} />
}
