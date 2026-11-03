import logo from "../../assets/logo-econverse.svg";
import instagram from "../../assets/icons/instagram.svg";
import facebook from "../../assets/icons/facebook.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import "./Footer.scss";

const footerGroups = [
  {
    title: "Institucional",
    items: ["Sobre Nós", "Movimento", "Trabalhe conosco"],
  },
  {
    title: "Ajuda",
    items: ["Suporte", "Fale Conosco", "Perguntas Frequentes"],
  },
  {
    title: "Termos",
    items: [
      "Termos e Condições",
      "Política de Privacidade",
      "Troca e Devolução",
    ],
  },
];

const socialNetworks = [
  { name: "Instagram", image: instagram },
  { name: "Facebook", image: facebook },
  { name: "LinkedIn", image: linkedin },
];

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__main'>
        <div className='footer__container'>
          <div className='footer__brand'>
            <a href='/' aria-label='Econverse — início'>
              <img
                className='footer__logo'
                src={logo}
                alt='Econverse'
                width={164}
                height={48}
              />
            </a>

            <p className='footer__description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <ul className='footer__social' aria-label='Redes sociais'>
              {socialNetworks.map((network) => (
                <li key={network.name}>
                  <img
                    src={network.image}
                    alt={network.name}
                    width={24}
                    height={24}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className='footer__groups'>
            {footerGroups.map((group) => (
              <section className='footer__group' key={group.title}>
                <h2 className='footer__group-title'>{group.title}</h2>

                <ul className='footer__items'>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className='footer__bottom'>
        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
      </div>
    </footer>
  );
}

export default Footer;
