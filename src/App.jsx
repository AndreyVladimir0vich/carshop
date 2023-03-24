import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { findLike, useDebounce } from './utils/utils'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import { UserContext } from './context/userContext'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { api } from './utils/api'
import SearchInfo from './SearchInfo/SearchInfo'
import Page404 from './pages/Page404'
import FaqPage from './pages/FaqPage'
import FavouritesPage from './pages/FavouritesPage'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [parentCounter, setParentCounter] = useState(0)
  const [favourites, setFavourites] = useState([])
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
        const filteredData = filtredCards(productData.products, userData._id)
        setCards(filteredData) //productData.products
        const favouritesCard = filteredData.filter((e) => findLike(e, userData))
        setFavourites(favouritesCard)
      }
    )
  }, [])

  const handleProductLike = (product) => {
    const isLiked = findLike(product, currentUser)
    console.log('>>>>>', isLiked)
    api.changeLikeProductStatus(product._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c
      })
      setCards(newCards)
      setFavourites(
        !isLiked
          ? (stateFavour) => [...stateFavour, newCard]
          : (stateFavour) => stateFavour.filter((f) => f._id !== newCard._id)
      )
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
    favourites,
    navigate,
    setFavourites,
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
            <Route path="*" element={<Page404 />}></Route>
            <Route path="faq" element={<FaqPage />}></Route>
            <Route path="favourites" element={<FavouritesPage />}></Route>
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default App
