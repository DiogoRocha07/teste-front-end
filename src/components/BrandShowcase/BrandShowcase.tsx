import logo from "../../assets/logo-econverse.svg";
import "./BrandShowcase.scss";

const brands = [
  "brand-one",
  "brand-two",
  "brand-three",
  "brand-four",
  "brand-five",
];

function BrandShowcase() {
  return (
    <section className='brands' aria-labelledby='brands-title'>
      <h2 id='brands-title' className='brands__title'>
        Navegue por marcas
      </h2>

      <ul className='brands__list'>
        {brands.map((brand) => (
          <li className='brands__item' key={brand}>
            <img
              className='brands__logo'
              src={logo}
              alt='Econverse'
              width={117}
              height={35}
              loading='lazy'
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BrandShowcase;
