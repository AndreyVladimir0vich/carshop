import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../Product/Product'
import { api } from '../utils/api'
import { UserContext } from '../context/userContext'

export const ProductPage = () => {
  const id = useParams()
  const { currentUser, handleProductLike } = useContext(UserContext)
  const [product, setProduct] = useState(null)

  const onSendReview = (newProduct) => {
    setProduct({ ...newProduct })
  }

  const onProductLike = () => {
    const wasLiked = handleProductLike(product)
    if (wasLiked) {
      const filteredLikes = product.likes.filter((e) => e !== currentUser._id)
      setProduct({ ...product, likes: filteredLikes })
    } else {
      const addedLikes = [...product.likes, currentUser._id]
      setProduct({ ...product, likes: addedLikes })
    }
  }

  useEffect(() => {
    if (!id?.productId) return
    api.getProductById(id?.productId).then((data) => setProduct(data))
  }, [id?.productId])

  return product && currentUser ? (
    <Product
      product={product}
      id={id.productId}
      onSendReview={onSendReview}
      onProductLike={onProductLike}
    />
  ) : (
    <div>Загрузка</div>
  )
}
