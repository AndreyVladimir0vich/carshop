import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from './utils/utils'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import { UserContext } from './context/userContext'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { Modal } from './Modal/Modal'
import { api } from './utils/api'
import SearchInfo from './SearchInfo/SearchInfo'
import Page404 from './pages/Page404'
import FaqPage from './pages/FaqPage'
import FavouritesPage from './pages/FavouritesPage'
import { Login } from './Auth/Login'
import { Register } from './Auth/Register'
import { ResetPassword } from './Auth/ResetPassword'
import { parseJwt } from './utils/parseJWT'
import './App.css'
import { Userpage } from './pages/Userpage'
import ShopingCartPage from './pages/ShopingCartPage'
import { useDispatch, useSelector } from 'react-redux'
import { userFetch } from './storageRTK/userSlice'
import { productFetch } from './storageRTK/CarProdSlice'

function App() {
  const [searchRequest, setSearchRequest] = useState('')
  const [cards, setCards] = useState([])
  const [activeModal, setShowModal] = useState(false)
  const [isAuthentificatedUser, setIsAuthentificatedUser] = useState(false)
  const [itemsShopingCart, setItemsShopingCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  )
  const debounceValueInApp = useDebounce(searchRequest, 400)
  const navigate = useNavigate((s) => s)
  const isMounted = useRef(false)
  const actualUser = useSelector((state) => state.user.data)
  const { data: prod, favourites } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  const filtredUserCards = (products, id) =>
    products.filter((prod) => prod.author._id === id)

  const handleSearchQuery = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filtredUserCards(data, actualUser._id)))
  }

  //накопитель для уменьшения количиства запросов на сервер
  useEffect(() => {
    handleSearchQuery(debounceValueInApp)
  }, [debounceValueInApp])

  //диспач информации о пользователе
  useEffect(() => {
    if (!isAuthentificatedUser) {
      return
    }

    dispatch(userFetch()).then(() => dispatch(productFetch()))
  }, [dispatch, isAuthentificatedUser])

  useEffect(() => {
    setCards(filtredUserCards(prod, actualUser._id))
  }, [prod, actualUser])

  //создание нового обекта с каутером и добовление его в корзину
  const handleAddItemsShopingCart = (product) => {
    const calcDiscountPrice = Math.round(
      product.price - (product.price * product.discount) / 100
    )
    const items = {
      id: product._id,
      name: product.name,
      price: calcDiscountPrice,
      pictures: product.pictures,
      count: 1,
    }
    setItemsShopingCart([...itemsShopingCart, items])
    console.log({ product })
  }

  //удаление товара из корзины
  const handleRemoveItem = (id) => {
    setItemsShopingCart(itemsShopingCart.filter((item) => item.id !== id))
  }

  // +1 к каутеру
  const handleIncreaseCount = (id) => {
    setItemsShopingCart(
      itemsShopingCart.map((item) => {
        if (item.id === id) {
          item.count++
        }
        return item
      })
    )
  }

  // -1 к каутеру или удаление товара из корзины если count < 2
  const handleDecreaseCount = (id, count) => {
    if (count < 2) {
      handleRemoveItem(id)
    } else {
      setItemsShopingCart(
        itemsShopingCart.map((item) => {
          if (item.id === id) {
            item.count--
          }
          return item
        })
      )
    }
  }

  // следит за стейтом корзины и переписывает его в локальное хранилище
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(itemsShopingCart)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [itemsShopingCart])

  // сортировочная
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

  // передача  в контекст
  const contextValue = {
    cards,
    searchRequest,
    favourites,
    activeModal,
    isAuthentificatedUser,
    itemsShopingCart,
    setCards,
    navigate,
    setSearchRequest,
    setSortCards,
    setShowModal,
    setIsAuthentificatedUser,
    setItemsShopingCart,
    handleAddItemsShopingCart,
    handleIncreaseCount,
    handleDecreaseCount,
  }

  //авторизация токеном из локального хранилища
  useEffect(() => {
    const token = localStorage.getItem('token')
    const uncodedToken = parseJwt(token)
    if (uncodedToken?._id) {
      setIsAuthentificatedUser(true)
    }
  }, [navigate])

  //пути и модальные окна авторизации, регистрации, сброса пароля
  const authRoutes = (
    <>
      {' '}
      <Route
        path="login"
        element={
          <Modal activeModal={activeModal} setShowModal={setShowModal}>
            <Login setShowModal={setShowModal} />
          </Modal>
        }
      ></Route>
      <Route
        path="register"
        element={
          <Modal activeModal={activeModal} setShowModal={setShowModal}>
            <Register setShowModal={setShowModal} />
          </Modal>
        }
      ></Route>
      <Route
        path="reset-password"
        element={
          <Modal activeModal={activeModal} setShowModal={setShowModal}>
            <ResetPassword setShowModal={setShowModal} />
          </Modal>
        }
      ></Route>
    </>
  )

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <Header />
        {isAuthentificatedUser ? (
          <main className="content container">
            <SearchInfo />
            <Routes>
              <Route path="/" element={<CatalogPage />}></Route>
              <Route
                path="/product/:productId"
                element={<ProductPage />}
              ></Route>
              <Route path="*" element={<Page404 />}></Route>
              <Route path="faq" element={<FaqPage />}></Route>
              <Route path="user" element={<Userpage />}></Route>
              <Route path="favourites" element={<FavouritesPage />}></Route>
              <Route path="shopingCart" element={<ShopingCartPage />}></Route>
              {authRoutes}
              <Route
                path="login"
                element={
                  <Modal
                    activeModal={activeModal}
                    setShowModal={setShowModal}
                  ></Modal>
                }
              ></Route>
            </Routes>
          </main>
        ) : (
          <div className="not__auth">
            Пожалуйста, авторизуйтесь
            <Routes>{authRoutes}</Routes>
          </div>
        )}
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default App
