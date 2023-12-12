import { useState } from 'react'
import book from './assets/icon_book.svg';
import arrow from './assets/icon_arrow.svg';
import moon from './assets/icon_moon.svg';
import './App.scss'
import './Main.scss';

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(darkThemeMq);
  const data = {
    title: 'keyboard',
    phonetic: '/ki:bo:d/',
    part: 'noun',
    meaning:[
      '(etc.) A set of keys used to operate a typewriter, computer etc.',
      'A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.',
      'A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.'
    ],
    synonym: 'hehehe'
  }

  const meanings = data.meaning.map(item => <li key={item} className='meaning__item'>{item}</li>)

  return (
    <>
      <header className='header'>
        <img className='header__icon' src={book} alt="book icon"/>
        <div className='header__controls'>
          <div className='fonts-select'>
            <span className='fonts-select__text'>
              Sans Serif
            </span>
            <img className='fonts-select__icon' src={arrow} alt="arrow icon" />
          </div>

          <div className='theme-select'>
            <label className="theme-switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
            <img src={moon} alt="moon icon" />
          </div>
        </div>
      </header>

      <main className='main'>
          <div className='search-bar'>
            <input type="text" className='search-bar__input' placeholder='Search for any word...' />
            <button type='button' className='search-bar__button' />
          </div>
          <div className='result'>
            <div className='result__header'>
              <div className='result__header-text'>
                <h2 className='result__title'>{data.title}</h2>
                <p className='result__phonetic'>{data.phonetic}</p>
              </div>
              <button className='result__button'></button>
            </div>

            <div className='result__content'>
              <div className='result__item'>
                <div className="result__item-header">
                  {data.part}
                </div>
                <div className='meaning'>
                  <h4 className="meaning__header">Meaning</h4>
                  <ul className='meaning__list'>
                    {meanings}
                  </ul>
                </div>
                <div className='result__footer'>
                  Synonyms <span className='result__footer-accent'>{data.synonym}</span>
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  )
}

export default App
