import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import book from './assets/icon_book.svg';
import moon from './assets/icon_moon.svg';
import link from './assets/icon_link.svg';
import getWord from './getWord.ts';
import WordMeaning from './WordMeaning.tsx';
import Select from './select/Select.tsx';
import { ErrorMessage } from '@hookform/error-message';
import './NotFound.scss';
import './darkTheme.scss';
import './App.scss';
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

interface INotFoundResult{
  title: string;
  message: string;
  resolution: string;
}

function App() {
  const {register, formState:{errors}, handleSubmit} = useForm<IFormInput>();
  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(Boolean(darkThemeMq));
  const [word, setWord] = useState<false | IWordResult>(false);
  const [error, setError] = useState<false | INotFoundResult>(false);
  const [font, setFont] = useState<'Inter' | 'Lora' | 'Mono'>('Mono');

  const onSubmit:SubmitHandler<IFormInput> = async (data) => {
    const result:IWordResult[] | INotFoundResult = await getWord(data.word);
    if(Array.isArray(result)){
      setWord(result[0]);
    }else{
      setWord(false);
      setError(result);
    }
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
            <Select 
              setFont={setFont}
              options={[
                'Inter',
                'Lora',
                'Mono'
              ]}
              currentFont={font}/>

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
              <ErrorMessage 
                errors={errors}
                name='word'
                render={({message}) => <p className='error-message'>{message}</p>}
                />
              <input type="text" className='search-bar__input' {...register("word", {required: 'Whoops, can’t be empty…', minLength: 2})} placeholder='Search for any word...'/>
              <button type='submit' className='search-bar__button'/>
            </form>
            <div className='result'>
              {
                word &&
                <>
                  <div className='result__header'>
                    <div className='result__header-text'>
                      <h2 className='result__title'>{word.word}</h2>
                      <p className='result__phonetic'>{word.phonetic}</p>
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
                </>
              }

              {
                error &&
                <div className='not-found'>
                  <h3 className='not-found__header'>
                    <span className='not-found__emoji'>😕</span>
                    <span className='not-found__subheader'>{error.title}</span>
                  </h3>
                  <p className='not-found__text'>
                    {`${error.message} ${error.resolution}`}
                  </p>
                </div>
              }
              
            </div>
        </main>
      </div>
    </div>
  )
}

export default App
