import { useState } from "react";
import "./Newsletter.scss";

function Newsletter() {
  const [message, setMessage] = useState("");

  return (
    <section className='newsletter' aria-labelledby='newsletter-title'>
      <div className='newsletter__container'>
        <div className='newsletter__intro'>
          <h2 id='newsletter-title' className='newsletter__title'>
            Inscreva-se na nossa newsletter
          </h2>

          <p className='newsletter__description'>
            Assine a nossa newsletter e receba as novidades e conteúdos
            exclusivos da Econverse.
          </p>
        </div>

        <form
          className='newsletter__form'
          aria-labelledby='newsletter-title'
          onSubmit={(event) => {
            event.preventDefault();
            setMessage(
              "Formulário demonstrativo: nenhuma inscrição foi enviada.",
            );
          }}
        >
          <div className='newsletter__fields'>
            <label className='sr-only' htmlFor='newsletter-name'>
              Nome
            </label>

            <input
              id='newsletter-name'
              name='name'
              type='text'
              autoComplete='name'
              placeholder='Digite seu nome'
              required
            />

            <label className='sr-only' htmlFor='newsletter-email'>
              E-mail
            </label>

            <input
              id='newsletter-email'
              name='email'
              type='email'
              autoComplete='email'
              placeholder='Digite seu e-mail'
              required
            />

            <button className='newsletter__button' type='submit'>
              Inscrever
            </button>
          </div>

          <label className='newsletter__consent'>
            <input name='consent' type='checkbox' required />
            <span>Aceito os termos e condições</span>
          </label>

          {message && (
            <p className='newsletter__message' role='status'>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
