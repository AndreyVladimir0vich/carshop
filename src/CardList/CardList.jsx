import { Card } from '../Card/Card';
import './index.css';
import data from '../data/data.json';

export const CardList = ({ cards, handleProductLike, currentUser, setParentCounter }) => {
  return (
    <div className='cards'>
    {cards.map((item) => {
        return <Card 
          {...item} 
          key={item._id}  
          currentUser={currentUser}
          product={item}
          onProductLike={handleProductLike}
          setParentCounter={setParentCounter}
          />;
      })}
    </div>
  );
};