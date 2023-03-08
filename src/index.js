import playList from './playList.js';

// time 
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

// greeting 
const greeting = document.querySelector('.greeting');
getTimeOfDay();
const name = document.querySelector('.name');
name.addEventListener('keyup', function () {
    if (name.value.length > 20) {
        alert('The name is too long!');
        name.value = '';
    }
})

function setLocalStorage() {
    localStorage.setItem('name', name.value)
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather();
    }
}
window.addEventListener('load', getLocalStorage)

function getTimeOfDay() {
    let i = getPartOfDay();
    let arrTimeOfDay = ['Good night', ' Good morning', 'Good afternoon', 'Good evening'];
    greeting.textContent = `${arrTimeOfDay[i]},`;
}

function getPartOfDay() {
    const date = new Date;
    const hours = date.getHours();
    let part = Math.trunc(hours / 6);
    return part;
}

//background 
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
    } else if (i === 1) {
        folder = 'morning'
    } else if (i === 2) {
        folder = 'afternoon'
    } else {
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


//weather widget
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherError = document.querySelector(".weather-error");
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

city.addEventListener('change', getWeather);

async function getWeather() {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=779ff40c3c824c3a032d675521b5b15c&units=metric`;
    const res = await fetch(url);
    if (!res.ok) {
        return (
            (weatherError.textContent = 'City not found!'),
            (temperature.textContent = ''),
            (weatherDescription.textContent = ''),
            (weatherIcon.className = ''),
            (wind.textContent = ''),
            (humidity.textContent = '')
        )
    };
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = '';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}
getWeather();

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('change', getWeather);


//quotes 
const quoteOfDay = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote')

async function getQuotes() {
    let i = Math.floor(Math.random() * 102)
    const quotes = './src/assets/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quoteOfDay.textContent = data.quotes[i].quote
    author.textContent = data.quotes[i].author
}
getQuotes()
changeQuote.addEventListener('click', getQuotes);


// player
let isPlay = false;
let playNum = 0;
const audio = new Audio();
const playPrevBtn = document.querySelector('.play-prev');
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const trackTime = document.querySelector('.track-time');

//приведение времени трека к формату 0:00
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

let currrentTime = 0;

function playAudio() {
    audio.src = playList[playNum].src;
    trackName.textContent = playList[playNum].title;

    if (!isPlay) {
        audio.currentTime = currrentTime;
        audio.play();
        setInterval(function () {
            trackTime.textContent = formatTime(audio.currentTime) + ' / ' + playList[playNum].duration;
        }, 1000);
        // console.log(audio.currentTime);
        isPlay = true;
    } else {
        // console.log('audio.currentTime',audio.currentTime);
        audio.pause();
        currrentTime = audio.currentTime;
        // console.log(currrentTime);
        isPlay = false;
    }
    ul.children[playNum].classList.add('item-active');
}

playBtn.addEventListener('click', playAudio);
// audio.addEventListener('ended', playNext);

//добаление иконки паузы после клика 
function pauseBtn() {
    if (!isPlay) {
        playBtn.classList.remove('pause')
    } else {
        playBtn.classList.add('pause')
    }
}

function toggleBtn() {
    playBtn.classList.toggle('pause')
}

pauseBtn();
playBtn.addEventListener('click', toggleBtn);

//кнопки вперед и назад
function playNext() {
    ul.children[playNum].classList.remove('item-active');
    playNum < playList.length - 1 ? ++playNum : playNum = 0;
    isPlay = false;
    playAudio();
}

function playPrev() {
    ul.children[playNum].classList.remove('item-active');
    playNum === 0 ? playNum = playList.length - 1 : --playNum;
    isPlay = false;
    playAudio();
}
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);


//создание элемента с названием трека
const ul = document.querySelector('.play-list');

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    ul.append(li);
});


//Отключение звука по клику на иконку звука, смена иконки на mute
let muteIcon = document.querySelector('.volume-icon');

function toggleMute() {
    audio.muted = !audio.muted;
    muteIcon.classList.toggle('volume-icon');
    muteIcon.classList.toggle('mute-icon');
}

muteIcon.addEventListener('click', toggleMute);

//воспроизведение трека по клику на название в списке
const trackName = document.querySelector('.track-name');
trackName.textContent = playList[playNum].title;

function getPlayNum() {
    let tracksList = ul.children;
    for (let i = 0; i < tracksList.length; i++) {
        tracksList[i].addEventListener('click', function () {
            let temp = playNum;
            ul.children[temp].classList.remove('item-active');
            playNum = i;
            isPlay = false;
            playAudio();
        })
    }
}
getPlayNum();


//линия прогресса трека
const trackLine = document.querySelector('.audio-track')
const progressBar = document.querySelector('.progress');

audio.addEventListener('timeupdate', function () {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = progressPercent + '%';
});

//перемещение к определенному моменту воспроизведения
trackLine.addEventListener('click', function (event) {
    const progressBarWidth = trackLine.offsetWidth;
    const clickedX = event.offsetX;
    const duration = audio.duration;

    // вычисление новой позиции воспроизведения, на основе места, куда пользователь щелкнул на прогресс-баре
    const newTime = (clickedX / progressBarWidth) * duration;

    //новая позиция воспроизведения
    audio.currentTime = newTime;
});
//линия прогресса трека конец

//регулировка громкости

const volContainer = document.querySelector('.volume-container');
const volRange = document.querySelector('.volume-range');

function getVolumRange() {
    // const volumeWidth = volRange.offsetWidth;
    // const clickedX = event.offsetX;
    // const newRange = (clickedX / volumeWidth) * 100;
    // audio.volume = clickedX / volContainer;
    // volRange.style.width = `${newRange}%`;
    // console.log('newRange', volRange.value);
    // console.log('hi')
}
console.log('hi');
volRange.addEventListener('click', getVolumRange);