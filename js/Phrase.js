class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
        this.phraseDisplay = document.querySelector('#phrase ul');
    }

    /**
     * Adds letter placeholders to the display when game starts
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} x raised to the n-th power.
     */
    addPhraseToDisplay() { 
        const characters = this.phrase.split('');
        characters.forEach(character => {
            const display = document.createElement('li');
            if (character !== ' ') {
                display.setAttribute('class', `hide letter ${character}`);
                display.textContent = character;
            } else {
                display.setAttribute('class', 'space');
            }
            this.phraseDisplay.appendChild(display);
        });
    }

    /**
     * Adds letter placeholders to the display when game starts
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} x raised to the n-th power.
     */
    checkLetter(character) {
        const letterObjects = this.phraseDisplay.querySelectorAll('li');
        letterObjects.forEach(letterObject => {
            const letter = letterObject.getAttribute('class').split('').pop();
            if (letter === character) {
                this.showMatchedLetter(letterObject);
            }
        });
    }

    /**
     * Adds letter placeholders to the display when game starts
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} x raised to the n-th power.
     */
    showMatchedLetter(letter) {
        letter.classList.remove('hide');
        letter.classList.add('show');
    }
}
const display = new Phrase('test this phrase');
display.addPhraseToDisplay();
display.checkLetter('t');