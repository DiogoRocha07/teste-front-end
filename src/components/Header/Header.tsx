import logo from "../../assets/logo-econverse.svg";
import magnifyingGlass from "../../assets/icons/MagnifyingGlass.svg";
import box from "../../assets/icons/Box.svg";
import heart from "../../assets/icons/Heart.svg";
import userCircle from "../../assets/icons/UserCircle.svg";
import shoppingCart from "../../assets/icons/ShoppingCart.svg";
import shieldCheck from "../../assets/icons/ShieldCheck.svg";
import truck from "../../assets/icons/Truck.svg";
import creditCard from "../../assets/icons/CreditCard.svg";
import crownSimple from "../../assets/icons/CrownSimple.svg";
import "./Header.scss";

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <ul className='header__benefits'>
          <li className='header__benefit'>
            <img src={shieldCheck} alt='' width={20} height={20} />
            <span>
              Compra <strong>100% segura</strong>
            </span>
          </li>

          <li className='header__benefit'>
            <img src={truck} alt='' width={20} height={20} />
            <span>
              <strong>Frete grátis</strong> acima de R$ 200
            </span>
          </li>

          <li className='header__benefit'>
            <img src={creditCard} alt='' width={20} height={20} />
            <span>
              <strong>Parcele</strong> suas compras
            </span>
          </li>
        </ul>
        <div className='header__main'>
          <a className='header__logo' href='/' aria-label='Econverse — início'>
            <img src={logo} alt='Econverse' width={139} height={42} />
          </a>

          <div className='header__search' role='search'>
            <input
              type='search'
              disabled
              aria-label='Buscar produtos'
              placeholder='O que você está buscando?'
            />

            <button type='button' aria-label='Buscar' disabled>
              <img src={magnifyingGlass} alt='' width={28} height={28} />
            </button>
          </div>

          <div className='header__actions'>
            <button
              className='header__action header__action--orders'
              type='button'
              aria-label='Meus pedidos'
              disabled
            >
              <img src={box} alt='' width={24} height={24} />
            </button>

            <button
              className='header__action'
              type='button'
              aria-label='Favoritos'
              disabled
            >
              <img src={heart} alt='' width={32} height={32} />
            </button>

            <button
              className='header__action'
              type='button'
              aria-label='Minha conta'
              disabled
            >
              <img src={userCircle} alt='' width={32} height={32} />
            </button>

            <button
              className='header__action'
              type='button'
              aria-label='Carrinho'
              disabled
            >
              <img src={shoppingCart} alt='' width={32} height={32} />
            </button>
          </div>
        </div>
        <nav className='header__nav' aria-label='Navegação principal'>
          <ul className='header__nav-list'>
            <li>
              <span className='header__nav-item'>Todas categorias</span>
            </li>
            <li>
              <span className='header__nav-item'>Supermercado</span>
            </li>
            <li>
              <span className='header__nav-item'>Livros</span>
            </li>
            <li>
              <span className='header__nav-item'>Moda</span>
            </li>
            <li>
              <span className='header__nav-item'>Lançamentos</span>
            </li>
            <li>
              <span className='header__nav-item header__nav-item--highlight'>
                Ofertas do dia
              </span>
            </li>
            <li>
              <span className='header__nav-item'>
                <img src={crownSimple} alt='' width={20} height={20} />
                Assinatura
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
