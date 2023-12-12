import { MouseEventHandler, useState } from 'react'
import book from './assets/icon_book.svg';
import arrow from './assets/icon_arrow.svg';
import moon from './assets/icon_moon.svg';
import getWord from './getWord.ts';
import './App.scss'
import './Main.scss';
import WordMeaning from './WordMeaning.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  }[]
}

function App() {
  const {register, handleSubmit} = useForm<IFormInput>();
  const [isDarkTheme, setIsDarkTheme] = useState(darkThemeMq);
  const [word, setWord] = useState<false | IWordResult>(false);

  const onSubmit:SubmitHandler<IFormInput> = async (data) => {
    const newWord:IWordResult[] = await getWord(data.word);
    setWord(newWord[0]);
  }

  const items = word && word.meanings.map(item => <WordMeaning key={item.definitions[0].definition} meaning={item}/>)

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
          <form className='search-bar' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className='search-bar__input' {...register("word", {required: true, minLength: 2})} placeholder='Search for any word...'/>
            <button type='submit' className='search-bar__button'/>
          </form>
          <div className='result'>
            <div className='result__header'>
              <div className='result__header-text'>
                <h2 className='result__title'>{word ? word.word : 'Nothing'}</h2>
                <p className='result__phonetic'>{word ? word.phonetic : 'Nothing'}</p>
              </div>
              <button className='result__button'></button>
            </div>

            <div className='result__content'>
              {items}
            </div>
          </div>
      </main>
    </>
  )
}

export default App
