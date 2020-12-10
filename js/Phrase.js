class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
        this.phraseDisplay = document.querySelector('#phrase ul');
    }

    /**
     * Cycle through characters and display them hidden on the screen
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
     * Check if a character matches a letter in the phrase
     * @param   {String}    character The letter that was clicked
     * @return  {Boolean}   Returns whether match is true or false
     */
    checkLetter(character) {
        const letterObjects = this.phraseDisplay.querySelectorAll('li');
        let match = [];
        letterObjects.forEach(letterObject => {
            if (letterObject.className !== 'space') {
                const letter = letterObject.getAttribute('class').split('').pop();
                if (letter === character) {
                    match.push(letterObject);
                }
            }
        });
        return match;
    }

    /**
     * Show the matching letter
     * @param   {Object}    letterObjects The letter objects that matched
     */
    showMatchedLetter(letterObjects) {
        letterObjects.forEach(letterObject => {
            letterObject.classList.remove('hide');
            letterObject.classList.add('show');
        });
    }
}