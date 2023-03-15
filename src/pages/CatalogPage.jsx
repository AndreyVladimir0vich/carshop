import { CardList } from '../CardList/CardList'
import SearchInfo from '../SearchInfo/SearchInfo'

export const CatalogPage = ({
  searchQuery,
  cards,
  currentUser,
  handleProductLike,
  setParentCounter,
}) => {
  return (
    <>
      <SearchInfo />
      <CardList
        currentUser={currentUser}
        handleProductLike={handleProductLike}
        setParentCounter={setParentCounter}
        cards={cards}
      />
    </>
  )
}
