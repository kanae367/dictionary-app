interface IMeaning{
    partOfSpeech: string;
    definitions: {
        definition: string;
        synonyms: string[];
        antonyms: string[];
        example?: string;
    }[],
    synonyms: string[];
    antonyms: string[];
}
const WordMeaning = ({meaning}:{
    meaning:IMeaning
}) => {

    const listItems = meaning.definitions.map(item => <li key={item.definition} className='meaning__item'>{item.definition}{item.example && <span className="meaning__item-example">{item.example}</span>}</li>)

    return(
        <div className='result__item'>
            <div className="result__item-header">
                {meaning.partOfSpeech}
            </div>
            <div className='meaning'>
                <h4 className="meaning__header">Meaning</h4>
                <ul className='meaning__list'>
                    {listItems}
                </ul>
            </div>
            {
                meaning.synonyms.length > 0 && 
                <div className='result__footer'>
                    Synonyms <span className='result__footer-accent'>{meaning.synonyms.join(', ')}</span>
                </div>
            }
        </div>
    )
}

export default WordMeaning;