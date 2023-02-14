import { Logo } from '../Logo/Logo';
import { Sociallinks } from '../Sociallinks/Sociallinks';
import './index.css';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='footer__wrapper'>
                    <div>
                        <Logo/>
                        <p>© «Интернет-магазин CarShop.ru»</p>
                    </div>
                    <div className='footer__container'>
                        <a href="#">Каталог</a>
                        <a href="#">Акции</a>
                        <a href="#">Новости</a>
                        <a href="#">Отзывы</a>
                    </div>
                    <div className='footer__container'>
                        <a href="#">Оплата и доставка</a>
                        <a href="#">Часто спрашивают</a>
                        <a href="#">Обратная связь</a>
                        <a href="#">Контакты</a>
                    </div>
                    <div className='footer__container'>
                        <h3 className='noMargin'>Мы на связи</h3>
                        <h4 className='noMargin'>8(999) 00-00-00</h4>
                        <p className='noMargin'>carshop@pochta.ru</p>
                        <Sociallinks/>
                    </div>
                </div>
            </div>
        </div>
    )
}