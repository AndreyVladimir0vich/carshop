import { Card } from '../Card/Card';
import './index.css';
import data from '../data/data.json';

export const CardList = ({ cards }) => {
  return (
    <div className='cards'>
    {cards.map((card) => {
        return <Card {...card} key={card.name} />;
      })}
    </div>
  );
};