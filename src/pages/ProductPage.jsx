import { useParams } from 'react-router-dom'
import { Product } from '../Product/Product'

export const ProductPage = ({ currentUser }) => {
  const id = useParams()

  return <Product currentUser={currentUser} id={id.productId} />
}
