import './HeroBanner.scss'

function HeroBanner() {
  return (
    <section className="hero-banner" aria-labelledby="hero-title">
      <div className="hero-banner__container">
        <h1 id="hero-title" className="hero-banner__title">
          Venha conhecer nossas{" "}
          <br />
          promoções
        </h1>

        <p className="hero-banner__offer">
          <strong>50% Off</strong> nos produtos
        </p>

        <a className="hero-banner__link" href="#produtos">
          Ver produto
        </a>
      </div>
    </section>
  )
}

export default HeroBanner