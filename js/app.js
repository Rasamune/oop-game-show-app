
/**
 * Initialize New Game Object
 */
const game = new Game();

/**
 * Start Game when clicking Start Button
 */
document.querySelector('#btn__reset').addEventListener('click', e => {
    game.startGame();
});

/**
 * Handle button clicks
 */
document.querySelector('#qwerty').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target);
    }
});

/**
 * Handle keyboard key presses
 */
document.addEventListener('keydown', e => {
    game.handleInteraction(e.key);
});