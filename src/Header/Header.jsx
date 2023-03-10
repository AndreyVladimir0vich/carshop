import React, { useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './index.css';
import IconBasket from './basketMaterial/BasketMaterial';

export const Header = ({setSearchQuery, searchQuery, parentCounter = 0, user}) => {

    const [counter, setCounter] = useState(parentCounter);

    useEffect(() => {
      setCounter((st) => st + 1);
    }, [parentCounter]);

    return (
        <div className='header' id='head'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            {/* <Basket /> */}
            <IconBasket count={counter} />
          </div>
          <div>
          <span>{user.email} {' '}</span>
          <span>{user.about}</span>
          </div>
        </div>
      </div>
    </div>
    )
}