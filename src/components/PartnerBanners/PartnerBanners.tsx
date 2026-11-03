import "./PartnerBanners.scss";

const banners = ["partner-one", "partner-two"];

function PartnerBanners() {
  return (
    <section className='partner-banners' aria-label='Parceiros'>
      {banners.map((banner) => (
        <article className='partner-banners__item' key={banner}>
          <div className='partner-banners__content'>
            <h2 className='partner-banners__title'>Parceiros</h2>

            <p className='partner-banners__description'>
              Lorem ipsum dolor sit amet, consectetur
            </p>

            <button className='partner-banners__button' type='button' disabled>
              Confira
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default PartnerBanners;
