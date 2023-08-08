let tutorialFase = 0, geralMana = 2,
    cemetery = [], deck, opponentLife = 100,
    playerLife = 100, firstTurn = true, turn = 'player',
    hand = [], mana, opponentMana, manaind = document.querySelector('.mana-indicator'),
    opponentHand = [], turnCount = 0, pickCard

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
}, { once: true })

function tutorial() {
    text = document.querySelector('.tutoText')
    tutorialElement = document.querySelector('.tutorial')
    spinner = document.querySelector('.spinner')
    text.style.opacity = 0
    spinner.style.opacity = 0
    tutorialFase++
    let coin = document.querySelector('.coin')

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
                coin.style.background = "black"
                break
            case 5:
                coin.style.background = "url('./assets/img/water-gif.gif')"
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

let handCards = document.querySelector('.hand')
let slots = document.querySelectorAll('.slot.player-slot')

function gameStart() {
    mana = 200
    manaind.innerText = mana

    document.querySelector('.coin').addEventListener('click', switchTurn)

    setTimeout(() => {
        playerPlay()
    }, 0);
}

function playerPlay() {
    if (turnCount < 1) {
        for (let i = 0; i < 5; i++) {
            createCard()
        }
    } else {
        createCard()
    }
    handCards.style.transform = 'translateY(0)'
}

function opponentPlay() {
    if (turnCount < 2) {
        for (let i = 0; i < 5; i++) {
            createCard()
        }
    } else {
        createCard()
    }
    setTimeout(() => {
        getOpponentPossibleCards()
    }, 1500);
}

const clickHandler = (card) => {
    if (card.target.classList.contains('card')) {
        playCard(card.target)
        pickCard = card.target
    } else if (card.target.classList.contains('cardStrength') || card.target.classList.contains('cardDefense')) {
        playCard(card.target.parentNode.parentNode)
        pickCard = card.target.parentNode.parentNode
    } else if (card.target.classList.contains('card-icon') || card.target.id == 'strengthValue' || card.target.id == 'defenseValue') {
        playCard(card.target.parentNode.parentNode.parentNode)
        pickCard = card.target.parentNode.parentNode.parentNode
    } else {
        playCard(card.target.parentNode)
        pickCard = card.target.parentNode
    }
}

function createCard() {
    let cardId = parseInt(Math.random() * cards.length)
    let cardInfo = cards[cardId]
    const card = document.createElement('div')
    const pic = document.createElement('div')
    const name = document.createElement('span')
    const effectLabel = document.createElement('span')
    const cost = document.createElement('div')
    const strength = document.createElement('span')
    const defense = document.createElement('span')
    const attributes = document.createElement('div')

    card.classList.add('inHandCard')
    card.id = cards.indexOf(cards[cardId])
    card.style.animation = 'unset'
    pic.classList.add('cardPic')
    name.classList.add('cardName')
    effectLabel.classList.add('cardEffectLabel')
    cost.classList.add('cardCost')
    attributes.classList.add('cardAttributes')
    strength.classList.add('cardStrength')
    defense.classList.add('cardDefense')
    card.setAttribute('cost', cardInfo.cost)

    if(!(card.classList.contains('card'))){
        card.classList.add('card')
    }

    cardInfo.effectLabel
        ? effectLabel.innerText = cardInfo.effectLabel
        : effectLabel.innerText = ''

    name.innerText = cardInfo.name
    cost.innerText = cardInfo.cost
    strength.innerHTML = `<div style="background-image: url('./assets/img/atk.png')" class='card-icon'></div> <span id='strengthValue'>${cardInfo.strength}</span>`
    defense.innerHTML = `<div style="background-image: url('./assets/img/defense.png')" class='card-icon'></div> <span id='defenseValue'>${cardInfo.defense}</span>`
    pic.style.background = `center url(./assets/img/${cardInfo.pic}) no-repeat`
    pic.style.backgroundSize = 'cover'

    card.appendChild(pic)
    card.appendChild(name)
    card.appendChild(cost)
    card.appendChild(attributes)
    card.appendChild(effectLabel)
    attributes.appendChild(strength)
    attributes.appendChild(defense)

    if (turn == 'player') {
        card.addEventListener('click', clickHandler)
        buyCard(card)
    } else {
        opponentBuyCard(card)
    }
}

function verifyManaCard(cost) {
    if (cost > mana) {
        manaind.style.background = '#931621'
        manaind.style.animation = 'shake 0.5s'
        setTimeout(() => {
            manaind.style.background = 'var(--light-blue)'
            manaind.style.animation = 'none'
        }, 1200);
        return false
    } else {
        return true
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

    handCards.appendChild(card)
}

function opponentBuyCard(card) {
    opponentHand.push(card)
}

function placeCardAnimation(card) {
    document.querySelectorAll('.card').forEach(fieldCard => {
        fieldCard.style.animation = 'unset'
    })
    card.style.animation = 'placeCard .3s forwards'
}

function resetSlots() {
    slots.forEach(slot => {
        slot.replaceWith(slot.cloneNode(true))
    })
}

function reduceMana(cost) {
    mana = mana - cost
    manaind.innerText = mana
}

function placeCard(target, card) {
    if (target.classList.contains('player-slot')) {
        hand.splice(hand.indexOf(card), 1)
        target.appendChild(card)
        card.classList = ['card']
        card.style.transform = ''
        handCards.style.transform = 'translateY(0)'
        placeCardAnimation(card)
        removeSlotsClickListeners()
        card.removeEventListener('click', clickHandler)
        window['verifyFieldEffects']()
    }
}

function addSlotsClickListeners() {
    slots.forEach(slot => {
        if (!(slot.firstChild)) {
            slot.addEventListener('click', slotsEV)
        }
    })
}

function removeSlotsClickListeners() {
    slots.forEach(slot => {
        slot.removeEventListener('click', slotsEV)
    })
}

function slotsEV(target) {
    let cost = Number(pickCard.getAttribute('cost'))
    if (cards[pickCard.id].effectType) {
        cardInfo = cards[pickCard.id]
        if (cardInfo.effectType.includes('placed')) {
            window[cardInfo.effect](target.target)
        }
    }
    placeCard(target.target, pickCard)
    reduceMana(cost)
}

function playCard(card) {
    let cost = Number(card.getAttribute('cost'))
    if (verifyManaCard(cost)) {
        card.style.transform = 'translateY(-16rem)'
        handCards.style.transform = 'translateY(10rem)'

        addSlotsClickListeners()
    }
}

function switchTurn() {
    let cards = document.querySelectorAll('.card')
    let coin = document.querySelector('.coin')

    manaind.innerText = mana ?? ''

    if (turnCount >= 2) {
        attack()
    }
    if (turn == 'opponent') {
        turn = 'player'
        geralMana++
        mana = geralMana
        manaind.innerText = mana
        coin.style.cursor = 'pointer'
        coin.addEventListener('click', switchTurn)
        coin.style.background = "url('./assets/img/water-gif.gif')"
        playerPlay()
    } else {
        handCards.style.transform = 'translateY(20rem)'
        opponentMana = geralMana
        coin.removeEventListener('click', switchTurn)
        coin.style.background = 'black'
        coin.style.cursor = 'unset'
        turn = 'opponent'
        opponentPlay()
    }
    turnCount++
}

function attack() {
    if (turn == 'player') {
        let inFieldCards = document.querySelectorAll('.player-slot>.card')
        inFieldCards.forEach(card => {
            verifyOpponentCards(card)
        })
    } else {
        let inFieldCards = document.querySelectorAll('.opponent-slot>.card')
        inFieldCards.forEach(card => {
            opponentVerifyPlayerCards(card)
        })
    }
}

function opponentVerifyPlayerCards(card) {
    let playerLife = document.querySelector('.playerLife')
    let playerCard = document.querySelector(`.player-slot#${card.parentNode.id}>.card`)
    if (playerCard) {
        battle(card, playerCard)
    } else {
        attackAnimate(card)
        setTimeout(() => {
            playerLife.innerText = Number(playerLife.innerText) - Number(card.querySelector('#strengthValue').innerText)
        }, 550);
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

function battle(attacker, defenser) {
    let defense = Number(defenser.querySelector('#defenseValue').innerText),
        attack = Number(attacker.querySelector('#strengthValue').innerText), life

    turn == 'player'
        ? life = document.querySelector('.opponentLife')
        : life = document.querySelector('.playerLife')

    attackAnimate(attacker, defenser)
    setTimeout(() => {
        if (defense == attack) {
            killCard(defenser)
        } else if (attack > defense) {
            life.innerHTML = life.innerText - (attack - defense)
            killCard(defenser)
        } else {
            defenser.querySelector('#defenseValue').innerText = defense - attack
        }
    }, 550);
}

function attackAnimate(attacker, defenser) {
    turn == 'player'
        ? attacker.style.animation = 'playerAttack .3s'
        : attacker.style.animation = 'opponentAttack .3s'
    defenser
        ? setTimeout(() => {
            defenser.style.animation = 'opponentDamaged .3s'
        }, 80)
        :
        setTimeout(() => {
            attacker.style.animation = 'unset'
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

function getOpponentPossibleCards() {
    possibleCards = opponentHand.filter(card => Number(card.querySelector('.cardCost').innerText) <= opponentMana);
    possibleCards.length > 0 ? opponentPlayCard(possibleCards) : setTimeout(switchTurn, 1000)
}

function opponentPlayCard(possibleCards) {
    const chosenCard = possibleCards[parseInt(Math.random() * possibleCards.length)]
    let playerCardsSlots = document.querySelectorAll('.player-slot:not(:empty)')
    const possibleOpponentSlot = []
    chosenCard.classList = ['card']
    playerCardsSlots.forEach(cardSlot => {
        if (document.querySelector(`.opponent-slot#${cardSlot.id}:empty`)) {
            possibleOpponentSlot.push(cardSlot)
        }
    })
    if (possibleOpponentSlot.length > 0) {
        let enemy = opponentDecideEnemy(possibleOpponentSlot, chosenCard)
        document.querySelector(`.opponent-slot#${enemy.id}`).appendChild(chosenCard)
    } else {
        let possibleSlots = document.querySelectorAll('.opponent-slot:empty')
        if (possibleSlots.length > 0) {
            possibleSlots[parseInt(Math.random() * possibleSlots.length)].appendChild(chosenCard)
        } else {
            return switchTurn()
        }
    }
    opponentHand.splice(opponentHand.indexOf(chosenCard), 1)
    placeCardAnimation(chosenCard)
    opponentMana -= Number(chosenCard.querySelector('.cardCost').innerText)
    getOpponentPossibleCards()
}

function opponentDecideEnemy(playerCardsSlots, chosenCard) {
    let selectedCard = playerCardsSlots[0]
    playerCardsSlots.forEach(playerCard => {
        if ((Number(playerCard.firstChild.querySelector('#defenseValue').innerText)
            <= Number(chosenCard.querySelector('#strengthValue').innerText))
        ) {
            selectedCard = playerCard
        }
    })
    return selectedCard
}