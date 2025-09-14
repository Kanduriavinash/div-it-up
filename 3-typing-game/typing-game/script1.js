const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    "i"
];

let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');


document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random()*quotes.length); // get a random number and store quote with that index into quote
    const quote = quotes[7];
    words = quote.split(' ');
    wordIndex = 0;
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.disabled = false; //reverting if user is trying to click start for 2nd time since it is already disabled 
    typedValueElement.focus();
    startTime = new Date().getTime();



typedValueElement.addEventListener('input', () => {
    const currentword = words[wordIndex];
    const typedValue = typedValueElement.value; //and typedValueElement.innerHTML.innertext is wrong 
    if(typedValue === currentword && wordIndex === words.length -1 ){
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${elapsedTime/1000} seconds.`;
        messageElement.innerText = message;
        typedValueElement.value = ''; //clear the input box
        typedValueElement.disabled = true; //disable the input box
        quoteElement.innerText="";//here, .value is not added 
        //typedValueElement.removeEventListener(); //remove the event listener
        if (!localStorage.getItem("highest score") || elapsedTime/1000 < (localStorage.getItem("highest score"))) {
            localStorage.setItem("highest score", elapsedTime/1000);
            console.log(elapsedTime/1000)
        }
                

        
    }else if(typedValue.endsWith(' ') && typedValue.trim() === currentword){
        typedValueElement.value = '';
        wordIndex++;
        for(const wordElement of quoteElement.childNodes){
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';
        

    }else if(currentword.startsWith(typedValue)){
        typedValueElement.className = '';
    }
    else{
        typedValueElement.className = 'error';
    }



})});


leaderboard.addEventListener('click', () => {
    highscore.innerHTML = localStorage.getItem("highest score");
});