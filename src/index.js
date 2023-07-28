


const menuToggle = document.querySelector('.menuToggle');
menuToggle.addEventListener('click', () => {
    const mainMenu = document.querySelector('.mainMenu');
    mainMenu.classList.toggle('hideMenu');
});
menuToggle.addEventListener('click', () => {
    const mainContent = document.querySelector('.mainContent');
    mainContent.classList.toggle('noMargin');
})