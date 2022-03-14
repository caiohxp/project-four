const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const four = 'GUGU'

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    '—',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'ENTER'
]

const guessRows = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const contentTile = document.createElement('div')
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        contentTile.classList.add('tile')
        contentTile.append(tileElement)
        rowElement.append(contentTile)
    })
    tileDisplay.append(rowElement)
})


keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log('clicked', letter)
    if(letter === '—'){
        deleteLetter()
        return
    }
    if(letter === 'ENTER'){
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter = (letter) => {
    if(currentTile < 5 && currentRow < 5){
        const tile = document.getElementById('guessRow-'+ currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log('guessRows', guessRows)
    }
}

const deleteLetter = () => {
    if(currentTile > 0){
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    const tile = document.querySelectorAll('.tile')
    if(currentTile > 3) {
        console.log('guess is ' + guess, 'four is ' + four)
        flipTile()
        if(four === guess){
            showMessage('GUGU!')
            isGameOver = true
            return
        } else{
            if(currentRow >= 3) {
                isGameOver = false
                console.log('ward')
                showMessage('Game Over')
                return
            }
            if(currentRow < 3){
                currentRow++
                console.log('row-'+currentRow)
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(()=> messageDisplay.removeChild(messageElement), 5000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkFour = four
    const guess = []
    const guessc = []
    rowTiles.forEach(father => {
        guessc.push({color: 'grey-overlay'})
        father.childNodes.forEach(tile => {
            guess.push({ letter: tile.getAttribute('data')})
        })
    })

    guess.forEach((guess, i) => {
        if (guess.letter == four[i]) {
            guessc[i].color = 'green-overlay'
            checkFour = checkFour.replace(guess.letter, '')
        }
    })

    guess.forEach((guess, i) => {
        if(checkFour.includes(guess.letter)) {
            guessc[i].color = 'yellow-overlay'
            checkFour = checkFour.replace(guess.letter, '')
        }
    })
    rowTiles.forEach((tile,i) =>{
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guessc[i].color)
            tile.classList.add('rotacao')
            tile.childNodes.forEach(letra => {
                letra.classList.add('.reverse-flip')
                letra.classList.add('rotacao-letra')
            })
            addColorToKey(guess[i].letter, guessc[i].color)
        }, 300 * i)
    })
}