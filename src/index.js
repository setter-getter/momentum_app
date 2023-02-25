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
