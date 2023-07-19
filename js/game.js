let cards = [
    {
        id: 1,
        name: 'Boxer',
        cost: 1,
        strength: 1,
        defense: 1,
        pic: 'boxer.png',
        effect: ''
    },
    {
        id: 2,
        name: 'Dragon',
        cost: 3,
        strength: 3,
        defense: 3,
        pic: 'dragon.png',
        effect: ''
    }
]

let tutorialFase = 0, geralMana = 2,
    cemetery = [], deck, opponentLife = 100,
    playerLife = 100, firstTurn = true, turn = 'player',
    hand = [], mana, opponentMana, manaind = document.querySelector('.mana-indicator'),
    opponentHand = []

document.querySelector('#pularTuto').addEventListener('click', () => {
    tutorialElement = document.querySelector('.tutorial')

    tutorialElement.style.opacity = 0
    setTimeout(() => {
        tutorialElement.style.display = 'none'
        document.querySelector('.cardExample').style.display = 'none'
        document.querySelector('main').classList.add('no-after')
        setTimeout(() => {
            gameStart()
        }, 100);
    }, 300);
})

function tutorial() {
    text = document.querySelector('.tutoText')
    tutorialElement = document.querySelector('.tutorial')
    spinner = document.querySelector('.spinner')
    text.style.opacity = 0
    spinner.style.opacity = 0
    tutorialFase++

    setTimeout(() => {
        switch (tutorialFase) {
            case 1:
                text.innerText = 'Jogue em tela cheia (F11)'
                break
            case 2:
                text.innerText = 'Este é o indicador de vida inimigo'
                spinner.style.opacity = 1
                spinner.style.top = '5.5%'
                spinner.style.left = '10.2%'
                break
            case 3:
                text.innerText = 'Este é o seu indicador de vida'
                spinner.style.opacity = 1
                spinner.style.top = 'unset'
                spinner.style.bottom = '12.2%'
                spinner.style.left = '10.2%'
                break
            case 4:
                text.innerText = `Clique na moeda para terminar o seu turno.
                Ao clica-la, ela ficara totalmente preta,
                indicando que é o turno do adversário`
                spinner.style.opacity = 1
                spinner.style.bottom = '49.15%'
                spinner.style.left = '47.9%'
                switchTurn()
                break
            case 5:
                switchTurn()
                firstTurn = true
                text.innerText = `Cada carta possui uma foto, nome, força e ataque`
                document.querySelector('.cardExample').style.opacity = 1
                break
            case 6:
                text.innerText = `E algumas possuem efeitos em jogo`
                document.querySelector('.exampleCardEffect').innerText = 'Aumenta seu ataque a cada 2 rodadas em jogo'
                break
            case 7:
                text.innerText = `Cada carta possui um custo de mana`
                spinner.style.opacity = 1
                spinner.style.top = '26.4%'
                spinner.style.left = '52.6%'
                spinner.style.bottom = 'unset'
                break
            case 8:
                spinner.style.opacity = 1
                spinner.style.top = '42.4%'
                spinner.style.left = 'unset'
                spinner.style.right = '8.5%'
                text.innerText = `Aqui é o valor de sua mana. 
                Vocë ganha 1 de mana por turno, podendo ser afetado por efeitos de cartas`
                break
            case 9:
                document.querySelector('.cardExample').style.opacity = 0
                text.innerText = `A cada fim de turno, as cartas lutam, 
                    subtraindo a força das aliadas da defesa das adversárias adjacentes`
                break
            case 10:
                text.innerText = `Quanda não há uma carta na frente de outra, ela bate diretamente contra o adversário`
                break
            case 11:
                text.innerText = `Ganha o adversário que levar a vida do outro a 0 primeiro`
                break
            case 12:
                text.innerText = `Boa sorte.`
                break
            case 13:
                tutorialElement.style.opacity = 0
                setTimeout(() => {
                    tutorialElement.style.display = 'none'
                    document.querySelector('.cardExample').style.display = 'none'
                    document.querySelector('main').classList.add('no-after')
                    setTimeout(() => {
                        gameStart()
                    }, 100);
                }, 300);
                break

        }
        text.style.opacity = 1
    }, 400);
}

document.querySelector('#tutoOk').addEventListener('click', () => {
    tutorial()
})

function gameStart() {
    mana = 2
    manaind.innerText = mana
    let hand = document.querySelector('.hand')

    window.addEventListener('click', () => {
        manaind.innerText = mana
    })

    document.querySelector('.coin').addEventListener('click', switchTurn)

    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            createCard()
        }
        hand.style.transform = 'translateY(0)'
    }, 0);
}

function createCard() {
    let cardInfo = cards[parseInt(Math.random() * 2)]
    const card = document.createElement('div')
    const pic = document.createElement('div')
    const name = document.createElement('span')
    const effect = document.createElement('span')
    const cost = document.createElement('div')
    const strength = document.createElement('span')
    const defense = document.createElement('span')
    const attributes = document.createElement('div')

    card.classList.add('inHandCard')
    card.id = cardInfo.id
    pic.classList.add('cardPic')
    name.classList.add('cardName')
    effect.classList.add('cardEffect')
    cost.classList.add('cardCost')
    attributes.classList.add('cardAttributes')
    strength.classList.add('cardStrength')
    defense.classList.add('cardDefense')

    name.innerText = cardInfo.name
    effect.innerText = cardInfo.effect
    cost.innerText = cardInfo.cost
    strength.innerHTML = `<div style="background-image: url('../assets/img/atk.png')" class='card-icon'></div> <span id='strengthValue'>${cardInfo.strength}</span>`
    defense.innerHTML = `<div style="background-image: url('../assets/img/defense.png')" class='card-icon'></div> <span id='defenseValue'>${cardInfo.defense}</span>`
    pic.style.background = `center url(../assets/img/${cardInfo.pic}) no-repeat`
    pic.style.backgroundSize = 'cover'

    card.appendChild(pic)
    card.appendChild(name)
    card.appendChild(effect)
    card.appendChild(cost)
    card.appendChild(attributes)
    attributes.appendChild(strength)
    attributes.appendChild(defense)

    card.addEventListener('click', (card) => {
        verifyManaCard(card, cardInfo.cost)
    })

    if (turn == 'player') {
        buyCard(card)
    } else {
        opponentBuyCard(card)
    }
}

function verifyManaCard(card, cost) {
    if (cost > mana) {
        manaind.style.background = '#931621'
        manaind.style.animation = 'shake 0.5s'
        setTimeout(() => {
            manaind.style.background = 'var(--light-blue)'
            manaind.style.animation = 'none'
        }, 1200);
    } else {
        if (card.target.classList.contains('card')) {
            playCard(card.target, cost)
        } else if (card.target.classList.contains('cardStrength') || card.target.classList.contains('cardDefense')) {
            playCard(card.target.parentNode.parentNode, cost)

        } else if (card.target.classList.contains('card-icon')) {
            playCard(card.target.parentNode.parentNode.parentNode, cost)
        }
        else {
            playCard(card.target.parentNode, cost)
        }
    }
}

function buyCard(card) {
    hand.push(card)

    if (hand.length >= 3) {
        hand.forEach((card, i) => {
            card.classList = ['inHandCard card']
            card.classList.add(`hand-${hand.length}-card-${i + 1}`)
        })
    }

    document.querySelector('.hand').appendChild(card)
}

function opponentBuyCard(card) {
    opponentHand.push(card)
}

function playCard(card, cost) {
    let hand = document.querySelector('.hand')
    card.style.transform = 'translateY(-16rem)'
    hand.style.transform = 'translateY(10rem)'
    let slots = document.querySelectorAll('.slot.player-slot')

    function placeCard(target) {
        target.appendChild(card)
        card.classList = ['card']
        card.style.transform = ''

        slots.forEach(slot => {
            slot.replaceWith(slot.cloneNode(true))
        })
        hand.style.transform = 'translateY(0)'
        mana -= cost
    }

    slots.forEach(slot => {
        slot.addEventListener('click', (e) => {
            placeCard(e.target)
        })
    })
}

function switchTurn() {
    let hand = document.querySelector('.hand')
    let cards = document.querySelectorAll('.card')
    let coin = document.querySelector('.coin')

    if (mana) {
        manaind.innerText = mana
    }

    if (turn == 'opponent') {
        hand.style.bottom = '0'
        turn = 'player'
        geralMana++
        mana = geralMana
        manaind.innerText = mana
        coin.addEventListener('click', switchTurn)
        coin.style.background = "url('../assets/img/water-gif.gif')"
    } else {
        attack()
        hand.style.bottom = '-20rem'
        opponentMana = geralMana
        coin.removeEventListener('click', switchTurn)
        coin.style.background = 'black'
        coin.style.cursor = 'unset'
        turn = 'opponent'
        opponentPlay()
    }
}

function attack() {
    if (turn == 'player') {
        let inFieldCards = document.querySelectorAll('.player-slot>.card')
        inFieldCards.forEach(card => {
            verifyOpponentCards(card)
        })
    } else {
    }
}

function verifyOpponentCards(card) {
    let opponentLife = document.querySelector('.opponentLife')
    let opponnetCard = document.querySelector(`.opponent-slot#${card.parentNode.id}>.card`)
    if (opponnetCard) {
        battle(card, opponnetCard)
    } else {
        attackAnimate(card)
        setTimeout(() => {
            opponentLife.innerText = Number(opponentLife.innerText) - Number(card.querySelector('#strengthValue').innerText)
        }, 550);
    }
}

function battle(playerCard, opponentCard) {
    let opponentDefense = Number(opponentCard.querySelector('#defenseValue').innerText)
    let playerStrength = Number(playerCard.querySelector('#strengthValue').innerText)

    attackAnimate(playerCard, opponentCard)

    setTimeout(() => {
        if (opponentDefense <= playerStrength) {
            killCard(opponentCard)
        } else {
            opponentCard.querySelector('#defenseValue').innerText = opponentDefense - playerStrength
        }
    }, 550);
}

function attackAnimate(card, opponentCard) {
    card.style.animation = 'playerAttack .3s'
    if (opponentCard) {
        setTimeout(() => {
            opponentCard.style.animation = 'opponentDamaged .3s'
        }, 80);
    }
    setTimeout(() => {
        card.style.animation = 'unset'
    }, 600);
}

function killAnimate(card) {
    card.style.animation = '0.3s forwards killCard'
}

function killCard(card) {
    cemetery.push(card)
    killAnimate(card)
    setTimeout(() => {
        card.parentNode.innerHTML = ''
    }, 400);
}

function opponentPlay() {
    if (firstTurn <= 2) {
        for (let i = 0; i < 5; i++) {
            createCard()
        }
    } else {
        createCard()
    }

    getOpponentCard()
}

function getOpponentCard() {
    possibleCards = checkPossibleOpponentsCards()
    if(possibleCards){
        console.log(possibleCards);
    }else{
        setTimeout(() => {
            switchTurn()
        }, 1000);
    }
}

function checkPossibleOpponentsCards() {
    let possibleCards = []
    opponentHand.forEach(card => {
        if (Number(card.querySelector('.cardCost').innerText) < opponentMana) {
            possibleCards.push(card)
        }
    })
    if(possibleCards.length>1){
        return possibleCards
    }else{
        return false
    }
}