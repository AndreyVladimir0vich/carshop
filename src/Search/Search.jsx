import { ReactComponent as SearchIcon } from './Search.svg'
import { ReactComponent as CloseIcon } from './ic-close-input.svg'
import './index.css'

export const Search = ({ setSearchQuery }) => {
  return (
    <form className="search">
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search__input"
        placeholder="Поиск"
      />
      <button className="search__btn">
        <SearchIcon />
        {false && <CloseIcon />}
      </button>
    </form>
  )
}
