
import { useEffect, useState } from 'react';
import { CardList } from './CardList/CardList';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import data from './data/data.json';

function App() {
  const[searchQuery, setSearchQuery] = useState('')
  const[cards, setCards] = useState(data)

  useEffect(()=>{
    const newState = data.filter((e) =>
      e.name.toLowerCase().includes(searchQuery)
    );

    setCards(newState)
  },[searchQuery])


  return (
    <>
      <Header  setSearchQuery = {setSearchQuery} />
      <main className='content container'>
      {searchQuery && ( <p> {' '} По запросу {searchQuery} найдено {cards.length} товаров</p>)}
      <CardList cards = {cards} />
      </main>
      <Footer />
    </>
  );
}

export default App;
