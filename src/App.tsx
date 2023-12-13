import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import book from './assets/icon_book.svg';
import arrow from './assets/icon_arrow.svg';
import moon from './assets/icon_moon.svg';
import link from './assets/icon_link.svg';
import getWord from './getWord.ts';
import WordMeaning from './WordMeaning.tsx';
import './darkTheme.scss';
import './App.scss'
import './Main.scss';

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

interface IFormInput{
  word: string;
}

interface IWordResult{
  word: string;
  phonetic: string;
  phonetics: {
    text: string;
    audio?: string;
  }[],
  origin: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[],
    synonyms: string[];
    antonyms: string[];
  }[];
  sourceUrls: string[];
}

function App() {
  const {register, handleSubmit} = useForm<IFormInput>();
  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(Boolean(darkThemeMq));
  const [word, setWord] = useState<false | IWordResult>(false);
  const [font, setFont] = useState<'Inter' | 'Lora' | 'Mono'>('Mono');

  const onSubmit:SubmitHandler<IFormInput> = async (data) => {
    const newWord:IWordResult[] = await getWord(data.word);
    setWord(newWord[0]);
  }

  const onThemeChange = () => {
    const newState = !isDarkTheme;
    setIsDarkTheme(newState);
  }

  const items = word && word.meanings.map(item => <WordMeaning key={item.definitions[0].definition} meaning={item}/>)
  const sources = word && word.sourceUrls.map(item => <a key={item} href={item} className='result__sources-link'><span className='underline'>{item}</span><img className='result__sources-image' src={link}/></a>)

  return (
    <div className={`app-wrapper ${isDarkTheme && 'dark-theme'}`}>
      <div className={`${font} app`}>
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
                  <input type="checkbox" defaultChecked={!!isDarkTheme} onChange={onThemeChange}/>
                  <span className="slider round"></span>
              </label>
              <img src={moon} alt="moon icon" />
            </div>
          </div>
        </header>

        <main className='main'>
            <form className='search-bar' onSubmit={handleSubmit(onSubmit)}>
              <input type="text" className='search-bar__input' {...register("word", {required: true, minLength: 2})} placeholder='Search for any word...'/>
              <button type='submit' className='search-bar__button'/>
            </form>
            <div className='result'>
              <div className='result__header'>
                <div className='result__header-text'>
                  <h2 className='result__title'>{word ? word.word : 'Nothing'}</h2>
                  <p className='result__phonetic'>{word ? `/${word.word}/` : 'Nothing'}</p>
                </div>
                <button className='result__button'></button>
              </div>

              <div className='result__content'>
                {items}
              </div>

              <div className='result__sources'>
                <h6 className='result__sources-title'>Source</h6>
                <div className='result__sources-links'>
                  {sources}
                </div>
              </div>
            </div>
        </main>
      </div>
    </div>
  )
}

export default App
