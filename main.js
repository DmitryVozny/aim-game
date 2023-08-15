let startBtn = document.querySelector('.start')

let screens = document.querySelectorAll('.screen')
let timeElement = document.getElementById('time')

startBtn.addEventListener('click', (el) => {
    el.preventDefault()
    screens[0].classList.add('up')
})

let timeList = document.querySelector('.time-list')
let board = document.getElementById('board');
let time = 0
let score = 0
let colors = ['#d61800', '#edae01', '#c99e10', '#db9501', '#c9a66b', '#fd974f', '#496cb3', '#84d9d5']

timeList.addEventListener('click', (el) => {

    if (el.target.classList.contains('time-btn')) {
        time = parseInt(el.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }

        setTime(current)
    }
}


function setTime(value) {
    timeElement.innerHTML = `00:${value}`
}

function finishGame() {
    timeElement.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    let circle = document.createElement('div');
    circle.classList.add('circle')

    let color = getRandomColor()
    console.log(color)

    circle.style.background = color
    let size = getRandomNumber(10, 40);

    let { width, height } = board.getBoundingClientRect()

    let x = getRandomNumber(0, width - size)
    let y = getRandomNumber(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`

    circle.style.left = `${x}px`
    circle.style.top = `${y}px`


    board.append(circle)

}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min))
}

function getRandomColor() {
    let index = Math.floor(Math.random() * colors.length)
    return colors[index]
}