import { useEffect, useState } from 'react'
import { getIssues, useDebounce } from './utils/utils'
import { CardList } from './CardList/CardList'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { api } from './utils/api'
import data from './data/data.json'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cards, setCards] = useState(data)
  const [currentUser, setCurrentUser] = useState({})
  const [parentCounter, setParentCounter] = useState(0)

  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data]))
  }

  const debounceValueInApp = useDebounce(searchQuery, 500)

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

  function handleProductLike(product) {
    const isLiked = product.likes.some((el) => el === currentUser._id)
    isLiked
      ? api.deleteLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          )
          setCards([...newCards])
        })
      : api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          )
          setCards([...newCards])
        })
  }

  return (
    <>
      <Header
        user={currentUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        parentCounter={parentCounter}
      />
      <main className="content container">
        {searchQuery && (
          <p>
            По запросу {searchQuery} найдено {cards.length}
            {getIssues(cards.length)}
          </p>
        )}
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
