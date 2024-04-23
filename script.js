const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = form.elements[0].value;
    await getWordInfo(word);
});

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML= "Fetching Data......";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        displayWordInfo(data);
    } catch (error) {
        console.error('Error fetching word information:', error);
    }
}

const displayWordInfo = (data) => {
    const word = data[0].word;
    const partOfSpeech = data[0].meanings[0].partOfSpeech;
    const definition = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example;

    resultDiv.innerHTML = `
        <h2><strong>Word:</strong>${word}</h2>
        <p class="partOfSpeech">Part of Speech: ${partOfSpeech}</p>
        <p><strong>Meaning:</strong> ${definition === undefined ? "Not Found": definition}</p>
        <p><strong>Example:</strong> ${example === undefined ? "Not Found": example}</p>
        <p><strong>Antonyms:</strong></p>

    `;
    if (data[0].meanings[0].definitions[0] .antonyms.length === 0){
        resultDiv.innerHTML += `<span>Not Found</span>`


    }
    else{
        for(let i=0; i<data[0].meanings[0].definitions[0] .antonyms.length; i++){
            resultDiv.innerHTML +=`<li>${data[0].meanings[0].definitions[0].antonyms[i]}</li>`
        }
    }
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank"> Read More</a></div>`
    console.log(data);
    
}
