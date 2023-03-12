import { useEffect, useState } from 'react'
import { useDebounce } from './utils/utils'
import { CardList } from './CardList/CardList'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { api } from './utils/api'
// import data from './data/data.json'
import SearchInfo from './SearchInfo/SearchInfo'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [parentCounter, setParentCounter] = useState(0)

  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data]))
  }

  const debounceValueInApp = useDebounce(searchQuery, 400)

  useEffect(() => {
    handleSearch(debounceValueInApp)
  }, [debounceValueInApp])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData)
        setCards(productData.products)
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
        <SearchInfo
          searchQuery={searchQuery}
          cardsCount={cards.length}
          cards={cards}
        />
        <CardList
          currentUser={currentUser}
          handleProductLike={handleProductLike}
          setParentCounter={setParentCounter}
          cards={cards}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
