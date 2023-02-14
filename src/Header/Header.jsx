import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './index.css';

export const Header = ({setSearchQuery}) => {
    return (
        <div className='header'>
            <div className='container'>
                <div className='header__wrapper'>
                    <div className='header__left'>
                        <Logo /> <Search setSearchQuery = {setSearchQuery} />
                    </div>
                    <div>Войти</div>
                </div>
            </div>
        </div>
    )
}