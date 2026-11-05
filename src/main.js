import './style.css'
import datos from './datos.js'

const button = document.getElementById('throwDiceButton')
const betInput = document.getElementById('betInput')
const counterElement = document.getElementById('counter')
const result = document.getElementById('result')
const tapete = document.querySelector('.tapete')

const DADO_1 = datos[0]
const DADO_6 = datos[5]

button.addEventListener('click', () => {
  const betInputValue = betInput.value.trim().toLowerCase()
  let counter = parseInt(counterElement.textContent, 10) || 0

  if (betInputValue === '') {
    result.textContent = 'Por favor, introduce una apuesta.'
    return
  }

  if (betInputValue === 'macarrones') {
    animacion(() => {
      pintarDados(DADO_6, DADO_6, DADO_6)
      activarJackpot()
      counter += 30
      counterElement.textContent = counter
      button.disabled = false
    })
    return
  }

  const betValue = parseInt(betInputValue, 10)

  if (isNaN(betValue) || betValue < 1 || betValue > counter) {
    result.textContent = `Por favor, introduce un número válido. (1-${counter})`
    return
  }

  animacion(() => {
    const dice1 = caraAleatoria()
    const dice2 = caraAleatoria()
    const dice3 = caraAleatoria()

    pintarDados(dice1, dice2, dice3)

    if (dice1 === DADO_6 && dice2 === DADO_6 && dice3 === DADO_6) {
      activarJackpot()
      counter *= 5
    } else if (dice1 === DADO_1 && dice2 === DADO_1 && dice3 === DADO_1) {
      result.textContent = '¡Triple 1! ¡Que mala suerte!'
      counter -= 10
    } else if (dice1 === dice2 && dice2 === dice3) {
      result.textContent = '¡Has ganado! ¡Felicidades!'
      counter += betValue * 3
    } else if (dice1 === dice2 || dice1 === dice3 || dice2 === dice3) {
      result.textContent = '¡Has ganado! ¡Felicidades!'
      counter += betValue * 2
    } else {
      result.textContent = 'Lo siento, has perdido.'
      counter -= betValue
    }

    counterElement.textContent = counter

    if (counter <= 0) {
      result.textContent = '¡Te has quedado sin puntos! Buena suerte la próxima...'
    } else {
      button.disabled = false
    }
  })
})

function caraAleatoria() {
  return datos[Math.floor(Math.random() * datos.length)]
}

function pintarDados(cara1, cara2, cara3) {
  document.getElementById('dice1').src = cara1
  document.getElementById('dice2').src = cara2
  document.getElementById('dice3').src = cara3
}

function activarJackpot() {
  tapete.classList.add('jackpot')

  setTimeout(() => {
    tapete.classList.remove('jackpot')
  }, 3000)

  result.textContent = '¡Jackpot! ¡Felicidades!'
}

function animacion(alTerminar) {
  button.disabled = true

  const intervalo = setInterval(() => {
    pintarDados(caraAleatoria(), caraAleatoria(), caraAleatoria())
  }, 100)

  setTimeout(() => {
    clearInterval(intervalo)
    alTerminar()
  }, 1000)
}