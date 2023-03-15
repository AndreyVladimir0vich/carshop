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

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [parentCounter, setParentCounter] = useState(0)

  const filtredCards = (products, id) =>
    products.filter((prod) => prod.author._id === id)

  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filtredCards(data, currentUser._id))) //(data) => setCards([...data])||filtredCards(data, currentUser._id)
  }

  const debounceValueInApp = useDebounce(searchQuery, 400)

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

  const handleUpdateUser = (userUpdate) => {
    api.setUserInfo(userUpdate).then((newUser) => {
      setCurrentUser(newUser)
    })
  }

  function handleProductLike(product) {
    const isLiked = product.likes.some((id) => id === currentUser._id)
    api.changeLikeProductStatus(product._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c
      })
      setCards(newCards)
    })
  }

  const navigate = useNavigate()

  // const newProduct = {}
  // const cliker = async () => {
  //   await api.addNewProduct(newProduct)
  // }

  return (
    <>
      <Header
        user={currentUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        parentCounter={parentCounter}
        handleUpdateUser={handleUpdateUser}
      />
      <main className="content container">
        {/* <button onClick={() => cliker()}>add</button> */}
        <SearchInfo
          searchQuery={searchQuery}
          cardsCount={cards.length}
          cards={cards}
        />

        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage
                searchQuery={searchQuery}
                cards={cards}
                currentUser={currentUser}
                handleProductLike={handleProductLike}
                setParentCounter={setParentCounter}
              />
            }
          ></Route>
          <Route
            path="/product/:productId"
            element={<ProductPage currentUser={currentUser} />}
          ></Route>
          <Route path="*" element={<Page404 navigate={navigate} />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
