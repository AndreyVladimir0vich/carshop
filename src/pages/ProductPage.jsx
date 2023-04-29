import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../Product/Product'
import { api } from '../utils/api'
import { UserContext } from '../context/userContext'
import { useSelector } from 'react-redux'

export const ProductPage = () => {
  const params = useParams()
  const { handleProdAddDelLike, setCards, cards } = useContext(UserContext)
  const actualUser = useSelector((slice) => slice.user.data)
  const [product, setProduct] = useState(null)
  const onSendReview = (newProduct) => {
    setProduct({ ...newProduct })
  }

  const onProductLike = () => {
    const wasLiked = handleProdAddDelLike(product)
    if (wasLiked) {
      const filteredLikes = product.likes.filter((e) => e !== actualUser._id)
      setProduct({ ...product, likes: filteredLikes })
    } else {
      const addedLikes = [...product.likes, actualUser._id]
      setProduct({ ...product, likes: addedLikes })
    }
  }

  const onUpdateProduct = (newProduct) => {
    setProduct(() => ({ ...newProduct }))
    const index = cards.findIndex((e) => e._id === newProduct._id)
    setCards((state) => [
      ...state.slice(0, index),
      newProduct,
      ...state.slice(index + 1),
    ])
  }

  useEffect(() => {
    if (!params?.productId) return
    api.getProductById(params?.productId).then((data) => setProduct(data))
  }, [params?.productId])

  return product && actualUser ? (
    <Product
      product={product}
      id={params.productId}
      onSendReview={onSendReview}
      onProductLike={onProductLike}
      onUpdateProduct={onUpdateProduct}
    />
  ) : (
    <div>Загрузка</div>
  )
}
