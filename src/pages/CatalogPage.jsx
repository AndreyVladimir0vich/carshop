import { useContext } from 'react'
import { CardList } from '../CardList/CardList'
import { UserContext } from '../context/userContext'
import s from './CatalogPage.module.css'

export const CatalogPage = () => {
  const { setSortCards } = useContext(UserContext)
  const sortedItems = [
    { id: 'Новые' },
    { id: 'Сначала дешевые' },
    { id: 'Сначала дорогие' },
    { id: 'Популярные' },
  ]
  return (
    <>
      <div className={s.sortcards}>
        {sortedItems.map((e) => (
          <span
            key={e.id}
            className={s.sortitem}
            onClick={() => setSortCards(e.id)}
          >
            {e.id}
          </span>
        ))}
      </div>
      <CardList />
    </>
  )
}
