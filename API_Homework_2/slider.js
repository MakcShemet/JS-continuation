const sliderEl = document.querySelector('.slider');
const arrowPrev = document.querySelector('.prev');
const arrowNext = document.querySelector('.next');
const slides = Array.from(sliderEl.querySelectorAll('.slide'));
const activeSlide = sliderEl.querySelector('.active');
const ulLinks = document.querySelector('.links');
const dotaLinks = Array.from(ulLinks.querySelectorAll('.link-item'));

let index = slides.indexOf(activeSlide);
let lastIndex = slides.length - 1;
dotaLinks[index].classList.add('linked');

// Переключение на следующий слайд
arrowNext.addEventListener('click', () => {
    if (index !== lastIndex) {
        slides[index].nextElementSibling.classList.add('active');
        slides[index].classList.remove('active');
        dotaLinks[index].classList.toggle('linked');
        dotaLinks[index].nextElementSibling.classList.toggle('linked');
        index++;
    } else {
        index = 0;
        slides[lastIndex].classList.remove('active');
        slides[index].classList.add('active');
        dotaLinks[index].classList.toggle('linked');
        dotaLinks[lastIndex].classList.toggle('linked');
    }
});

// Переключение на предыдущий слайд
arrowPrev.addEventListener('click', () => {
    if (index !== 0) {
        slides[index].classList.remove('active');
        slides[index].previousElementSibling.classList.add('active');
        dotaLinks[index].classList.toggle('linked');
        dotaLinks[index].previousElementSibling.classList.toggle('linked');
        index--;
    } else {
        slides[index].classList.remove('active');
        slides[lastIndex].classList.add('active');
        dotaLinks[index].classList.toggle('linked');
        dotaLinks[lastIndex].classList.toggle('linked');
        index = lastIndex;
    }
})

// Переключение слайдов по точкам навигации
ulLinks.addEventListener('click', (e) => {
    let dotaIndex = dotaLinks.indexOf(e.target);
    dotaLinks.forEach(dota => {
        if (dota.classList.contains('linked')) {
            dota.classList.remove('linked');
            e.target.classList.add('linked');
            slides.forEach(slide => {
                if (slide.classList.contains('active')) {
                    slide.classList.remove('active');
                }
            });
            slides[dotaIndex].classList.add('active');
        }
    });
    index = dotaIndex;
});

