import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { getIssues } from '../utils/utils'
import s from './SearchInfo.module.css'

const SearchInfo = () => {
  const { searchRequest, cards } = useContext(UserContext)
  return (
    searchRequest && (
      <section className={s.searchTitle}>
        По запросу <span className={s.boldText}>{searchRequest}</span> найдено:{' '}
        {cards.length} {getIssues(cards.length)}
      </section>
    )
  )
}

export default SearchInfo
