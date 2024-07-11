const slider = document.querySelector('.slider');
const sections = document.querySelectorAll('.section');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let index = 0;
let swipeLeft = false;
let swipeRight = true;


function showSection() {
    if (swipeRight) {
        const offset = -index*90;
        slider.style.transform = `translateX(${offset}vw)`;
    }
    if (swipeLeft) {
        const offset = -index*90;
        slider.style.transform = `translateX(${offset}vw)`;
    }
}

nextButton.addEventListener('click', () => {
    if (index >= 3) {
        swipeRight = false;
    }
    else if (index < 3) {
        index++;
        swipeLeft=true;
        showSection();
    }
});

prevButton.addEventListener('click', () => {
    console.log(" prev clicked");

    if (index == 0){
        swipeLeft=false;
        return;
    }
    else if(index>0){
        index--;
        swipeRight=true;
        showSection();
    }
});

