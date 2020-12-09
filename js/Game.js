class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [ 'breath of fire',
                    'zelda',
                    'mario party',
                    'final fantasy',
                    'illusion of gaia' ];
        this.activePhrase = null;
    }

    /**
     * Start Game, get a random phrase and hide the overlay
     */
    startGame() {
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        // Hide Screen Overlay
        document.querySelector('#overlay').style.display = 'none';
    }

    /**
     * Gets a random phrase from the available phrases
     * @return  {Object}    Returns the random phrase object
     */
    getRandomPhrase() {
        const random = Math.floor(Math.random() * this.phrases.length);
        return new Phrase(this.phrases[random]);
    }

    /**
     * Handle when player clicks on the letter keys
     * @param   {Object}    letterObject The object of the key that was pressed
     */
    handleInteraction(letterObject) {
        letterObject.disabled = true;
        const letter = letterObject.textContent;
        // Check if letter is in the hidden phrase
        if(this.activePhrase.checkLetter(letter)) {
            letterObject.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            // Check if player has won
            if(this.checkForWin()) {
                this.gameOver('win');
            }
        } else {
            letterObject.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
     * Change heart image with every missed letter, check for losing condition
     */
    removeLife() {
        const hearts = document.querySelectorAll('#scoreboard ol li img');
        this.missed += 1;
        hearts[5 - this.missed].setAttribute('src', 'images/lostHeart.png');
        // If letter is missed 5 times, the game is over
        if (this.missed === 5) {
            this.gameOver('lose');
        }
    }

    /**
     * Check if player wins, if all letters have been revealed
     * @return  {Boolean}   True or false if player wins
     */
    checkForWin() {
        const letterObjects = this.activePhrase.phraseDisplay.querySelectorAll('li');
        let win = true;
        letterObjects.forEach(letterObject => {
            if (letterObject.classList.contains('hide')) {
                win = false;
            }
        });
        return win;
    }

    /**
     * Game is over, display results
     * @param   {String}    result Win or Lose string
     */
    gameOver(result) {
        let overlay = document.querySelector('#overlay');
        let overlayText = overlay.querySelector('h1');

        if (result === 'win') {
            overlay.className = 'win';
            overlayText.textContent = 'Yay, you win!';
        } else {
            overlay.className = 'lose';
            overlayText.textContent = 'Sorry, you lose!';
        }
        // Show screen overlay
        overlay.style.display = '';
    }
}