const getWord = async (word:string) => {
    return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => {
            return response.json();
        });
}

export default getWord;