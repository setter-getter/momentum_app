// time start

const time = document.querySelector('.time');
showTime();

function showTime() {
    const date = new Date;
    const options = { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' };
    time.textContent = date.toLocaleTimeString('en-US', options);
    setTimeout(showTime, 1000)
    setTimeout(getTimeOfDay, 1000);
    setTimeout(getPartOfDay, 1000);
}

const elDate = document.querySelector('.date');
showDate();
function showDate() {
    const date = new Date;
    const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' };
    elDate.textContent = date.toLocaleDateString('en-US', options);
}

// time finish

// greeting start

const greeting = document.querySelector('.greeting');
getTimeOfDay();
const name = document.querySelector('.name');
name.addEventListener('keyup', function () {
    if (name.value.length > 20) {
        alert('Имя слишком длинное! Введите имя меньше 20 символов.');
        name.value = '';
    }
})

function setLocalStorage() {
    localStorage.setItem('name', name.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
    }
}
window.addEventListener('load', getLocalStorage)

function getTimeOfDay() {
    let i = getPartOfDay();
    let arrTimeOfDay = ['Good night', ' Good morning', 'Good afternoon', 'Good evening'];
    greeting.textContent = `${arrTimeOfDay[i]},`;
}

function getPartOfDay(){
    const date = new Date;
    const hours = date.getHours();
    let part = Math.trunc(hours / 6);
    return part;
}

// greeting finish

//background start
let randomNum = 1;

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20 + 1)
}
getRandomNum();

function setBg() {
    let i = getPartOfDay();
    let num = randomNum;
    let folder = '';
    num < 10 ? num = num.toString().padStart(2, '0') : num = num.toString();
    if (i === 0) {
        folder = 'night'
    }
    else if (i === 1) {
        folder = 'morning'
    }
    else if (i === 2) {
        folder = 'afternoon'
    }
    else {
        folder = 'evening'
    }
    let url = `https://raw.githubusercontent.com/setter-getter/momentum_img/gh-pages/${folder}/${num}.jpg`;
    const img = new Image();
    img.src = url;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
    };
}
setBg();

let slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext)
let slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev)

function getSlideNext() {
    randomNum < 20 ? randomNum++ : randomNum = 1
    setBg();
}

function getSlidePrev() {
    randomNum > 1 ? randomNum-- : randomNum = 20
    setBg();
}
//background finish