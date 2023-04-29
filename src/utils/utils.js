import { useEffect, useState } from 'react'

export const getIssues = (numb) => {
  const tmp = numb % 10
  if (tmp === 1) return ' товар'
  if (tmp > 1 && tmp < 5) return ' товара'
  if (tmp > 4 || !numb) return ' товаров'
}

export const useDebounce = (searchRequest, delay) => {
  const [debounceValue, setDebounceValue] = useState(searchRequest)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchRequest)
    }, delay)

    return () => clearTimeout(timeout)
  }, [searchRequest, delay])
  return debounceValue
}

export const findLike = (product, actualUser) =>
  product?.likes?.some((el) => el === actualUser._id)
