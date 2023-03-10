import telega from './logo-telegram.svg'
import instagram from './logo-instagram.svg'
import viber from './logo-viber.svg'
import vk from './logo-vk.svg'
import whatsapp from './logo-whatsapp.svg'

export const Sociallinks = () => {
  return (
    <div className="line">
      <a href="https://web.telegram.org/k/" target="_blank" rel="noopener">
        <img src={telega} alt="telega" />
      </a>
      <a
        href="https://www.whatsapp.com/?lang=ru"
        target="_blank"
        rel="noopener"
      >
        <img src={whatsapp} alt="whatsapp" />
      </a>
      <a href="https://www.viber.com/ru/" target="_blank" rel="noopener">
        <img src={viber} alt="viber" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener">
        <img src={instagram} alt="instagram" />
      </a>
      <a href="https://vk.com/" target="_blank" rel="noopener">
        <img src={vk} alt="vk" />
      </a>
    </div>
  )
}
