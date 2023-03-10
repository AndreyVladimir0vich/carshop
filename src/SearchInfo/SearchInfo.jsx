import { getIssues } from '../utils/utils'
import s from './SearchInfo.module.css'

const SearchInfo = ({ searchQuery, cardsCount, cards }) => {
  return (
    searchQuery && (
      <section className={s.searchTitle}>
        По запросу <span className={s.boldText}>{searchQuery}</span> найдено:{' '}
        {cardsCount} {getIssues(cards.length)}
      </section>
    )
  )
}

export default SearchInfo
