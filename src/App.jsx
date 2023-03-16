import { useEffect, useState } from 'react'
import { useDebounce } from './utils/utils'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { api } from './utils/api'
import SearchInfo from './SearchInfo/SearchInfo'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import Page404 from './pages/Page404'
import { UserContext } from './context/userContext'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [parentCounter, setParentCounter] = useState(0)
  const debounceValueInApp = useDebounce(searchQuery, 400)
  const navigate = useNavigate()

  const filtredCards = (products, id) =>
    products.filter((prod) => prod.author._id === id)

  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filtredCards(data, currentUser._id))) //(data) => setCards([...data])||filtredCards(data, currentUser._id)
  }

  useEffect(() => {
    handleSearch(debounceValueInApp)
  }, [debounceValueInApp])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData)
        setCards(filtredCards(productData.products, userData._id)) //productData.products||filtredCards(productData.products, userData._id)
      }
    )
  }, [])

  const handleProductLike = (product) => {
    const isLiked = product.likes.some((id) => id === currentUser._id)
    api.changeLikeProductStatus(product._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c
      })
      setCards(newCards)
    })
  }

  // const handleUpdateUser = (userUpdate) => {
  //   api.setUserInfo(userUpdate).then((newUser) => {
  //     setCurrentUser(newUser)
  //   })
  // }
  // const newProduct = {}
  // const addCardinDB = async () => {
  //   await api.addNewProduct(newProduct)
  // }

  const setSortCards = (sort) => {
    if (sort === 'Новые') {
      const newCards = cards.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
      setCards([...newCards])
    }
    if (sort === 'Сначала дешевые') {
      const newCards = cards.sort((a, b) => a.price - b.price)
      setCards([...newCards])
    }
    if (sort === 'Сначала дорогие') {
      const newCards = cards.sort((a, b) => b.price - a.price)
      setCards([...newCards])
    }
    if (sort === 'Популярные') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length)
      setCards([...newCards])
    }
  }

  const contextValue = {
    cards,
    currentUser,
    searchQuery,
    parentCounter,
    setSearchQuery,
    setParentCounter,
    setSortCards,
    handleProductLike,
  }
  return (
    <>
      <UserContext.Provider value={contextValue}>
        <Header />
        <main className="content container">
          {/* <button onClick={() => addCardinDB()}>add</button> */}
          <SearchInfo />
          <Routes>
            <Route path="/" element={<CatalogPage />}></Route>
            <Route path="/product/:productId" element={<ProductPage />}></Route>
            <Route path="*" element={<Page404 navigate={navigate} />}></Route>
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default App
