/**
 * Selects the button element with the ID "wooden-button-start".
 * @type {HTMLButtonElement}
 * The header and footer will be hidden when the button is clicked.
 * On over on the header part of the screen, the header and footer will be displayed.
 */
const button = document.querySelector('#wooden-button-start');
const header = document.querySelector('header');
const footer = document.querySelector('footer');


let mousePos = { x: undefined, y: undefined };
button.addEventListener('click', function() {
    header.style.display = 'none';
    footer.style.display = 'none';
});



window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  if (header.style.display === 'none' && footer.style.display === 'none' && mousePos.y < 65) {
    header.style.display = 'flex';
    footer.style.display = 'flex';
  }
});
