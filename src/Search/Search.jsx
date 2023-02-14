import './index.css'

export const Search = ({setSearchQuery}) => {
    return (
        <input
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search__input" 
        placeholder='Поиск'
        />
    )
}