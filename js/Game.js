class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [ 
            new Phrase('kingdom hearts'),
            new Phrase('zelda'),
            new Phrase('mario party'),
            new Phrase('final fantasy'),
            new Phrase('resident evil'),
            new Phrase('god of war'),
            new Phrase('pokemon'),
            new Phrase('the witcher'),
            new Phrase('halo'),
            new Phrase('fire emblem'),
            new Phrase('mortal kombat'),
            new Phrase('animal crossing'),
            new Phrase('super metroid'),
            new Phrase('grand theft auto'),
            new Phrase('gears of war')
        ];
        this.activePhrase = null;
        this.ready = false;
    }

    /**
     * Start Game, get a random phrase and hide the overlay
     */
    startGame() {
        this.reset();
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        // Hide Screen Overlay
        document.querySelector('#overlay').style.display = 'none';
        this.ready = true;
    }

    /**
     * Gets a random phrase from the available phrases
     * @return  {Object}    Returns the random phrase object
     */
    getRandomPhrase() {
        const random = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[random];
    }

    /**
     * Handle when player clicks on the letter keys
     * @param   {Object/String}    key The object or string of the key that was pressed
     */
    handleInteraction(key) {
        // If key is a string we need to find its key object
        if (typeof key === 'string') {
            // If Enter key is pressed and game is not ready
            if (key === 'Enter' && !this.ready) {
                this.startGame();
            }
            const keyboardObjects = document.querySelectorAll('.key');
            // Set key to lowercase in case Caps Lock is on
            key = key.toLowerCase();
            keyboardObjects.forEach(object => {
                if (object.textContent === key) {
                    key = object;
                }
            });
        }
        // If key object wasn't found, do nothing
        // (This is in case a key is pressed that isn't on the onscreen keyboard)
        if (typeof key === 'object') {
            const letter = key.textContent;
            // Check if letter is in the hidden phrase, return matched letters as objects
            const letterObjects = this.activePhrase.checkLetter(letter);
            // Disable key so it can't be clicked
            key.disabled = true;

            // If key hasn't already been selected
            if(!key.classList.contains('chosen') && !key.classList.contains('wrong')) {
                // If letterObjects contains letters
                if(letterObjects.length) {
                    key.classList.add('chosen');
                    this.activePhrase.showMatchedLetter(letterObjects);
                    // Check if player has won
                    if(this.checkForWin()) {
                        this.gameOver('win');
                    }
                // letterObjects is empty, so the letter was no found
                } else {
                    key.classList.add('wrong');
                    this.removeLife();
                }
            }
        }
    }
    /**
     * Change heart image with every missed letter, check for losing condition
     */
    removeLife() {
        const hearts = document.querySelectorAll('#scoreboard ol li img');
        this.missed += 1;
        hearts[5 - this.missed].setAttribute('src', 'images/lostHeart.png');
        // If letter is missed 5 times, the game is over, the player loses
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
        const resetButton = document.querySelector('#btn__reset');

        if (result === 'win') {
            overlay.className = 'win';
            overlayText.textContent = `You win! The title was ${this.activePhrase.phrase.toUpperCase()}!`;
            resetButton.textContent = "Play Again";
        } else {
            overlay.className = 'lose';
            overlayText.textContent = `Sorry, the title was ${this.activePhrase.phrase.toUpperCase()}!`;
            resetButton.textContent = "Try Again";
        }
        // Show screen overlay
        overlay.style.display = '';
        this.ready = false;
    }

    /**
     * Reset values on Start Game
     */
    reset() {
        const keyboard = document.querySelectorAll('#qwerty button');
        const hearts = document.querySelectorAll('#scoreboard ol li img');
        this.missed = 0;
        // Clear Active Phrase
        if (this.activePhrase) {
            this.activePhrase.phraseDisplay.innerHTML = '';

        }
        // Reset keys to default
        keyboard.forEach(key => {
            key.className = 'key';
            key.disabled = false;
        });
        // Reset hearts to default
        hearts.forEach(heart => heart.setAttribute('src', 'images/liveHeart.png'));
    }
}