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

let tutorialFase = 0, deck, opponentLife = 100, playerLife = 100, firstTurn = true, turn = 'player', hand = [], mana, manaind = document.querySelector('.mana-indicator')

function tutorial() {
    text = document.querySelector('.tutoText')
    tutorialElement = document.querySelector('.tutorial')
    spinner = document.querySelector('.spinner')

    text.style.opacity = 0
    spinner.style.opacity = 0

    setTimeout(() => {
        switch (tutorialFase) {
            case 1:
                text.innerText = 'Jogue em tela cheia (F11)'
                break;
            case 2:
                text.innerText = 'Este é o indicador de vida inimigo'
                spinner.style.opacity = 1
                spinner.style.top = '5.5%'
                spinner.style.left = '10.2%'
                break;
            case 3:
                text.innerText = 'Este é o seu indicador de vida'
                spinner.style.opacity = 1
                spinner.style.top = 'unset'
                spinner.style.bottom = '12.2%'
                spinner.style.left = '10.2%'
                break;
            case 4:
                text.innerText = `Clique na moeda para terminar o seu turno.
                Ao clica-la, ela ficara totalmente preta,
                indicando que é o turno do adversário`
                spinner.style.opacity = 1
                spinner.style.bottom = '49.15%'
                spinner.style.left = '47.9%'
                switchTurn()
                break;
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
                document.querySelector('.cardExample').style.opacity = 0
                text.innerText = `A cada fim de turno, as cartas lutam, 
                subtraindo a força das aliadas da defesa das adversárias adjacentes`
                break
            case 8:
                text.innerText = `Quanda não há uma carta na frente de outra, ela bate diretamente contra o adversário`
                break
            case 9:
                text.innerText = `Ganha o adversário que levar a vida do outro a 0 primeiro`
                break;
            case 10:
                text.innerText = `Boa sorte.`
            case 11:
                tutorialElement.style.opacity = 0
                gameStart()
                break

        }
        text.style.opacity = 1
    }, 400);

    tutorialFase++
}

document.querySelector('#tutoOk').addEventListener('click', () => {
    tutorial()
})

function gameStart() {
    mana = 2
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            createCard()
        }
        document.querySelector('.hand').style.transform = 'translateY(0)'
    }, 0);

    window.addEventListener('click', () => {
        manaind.innerText = mana
    })

    document.querySelector('.coin').addEventListener('click', () => {
        switchTurn()
    })
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
    strength.innerHTML = `<div style="background-image: url('../assets/img/atk.png')" class='card-icon'></div>${cardInfo.strength}`
    defense.innerHTML = `<div style="background-image: url('../assets/img/defense.png')" class='card-icon'></div>${cardInfo.defense}`
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
        if (cardInfo.cost > mana) {
            manaind.style.background = '#931621'
            manaind.style.animation = 'shake 0.5s'
            setTimeout(() => {
                manaind.style.background = 'var(--light-blue)'
                manaind.style.animation = 'none'
            }, 1200);
        } else {
            if (card.target.classList.contains('card')) {
                playCard(card.target, cardInfo.cost)
            } else if (card.target.classList.contains('cardStrength') || card.target.classList.contains('cardDefense')) {
                playCard(card.target.parentNode.parentNode, cardInfo.cost)

            } else if (card.target.classList.contains('card-icon')) {
                playCard(card.target.parentNode.parentNode.parentNode, cardInfo.cost)
            }
            else {
                playCard(card.target.parentNode, cardInfo.cost)
            }
        }
    })

    buyCard(card)
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
    if (mana) {
        manaind.innerText = mana
    }
    let coin = document.querySelector('.coin')
    if (turn == 'opponent') {
        turn = 'player'
        coin.style.background = "url('../assets/img/water-gif.gif')"
    } else {
        turn = 'opponent'
        coin.style.background = 'black'
        coin.style.cursor = 'unset'
    }
    if (!firstTurn) {
        attack()
    } else {
        firstTurn = false
    }
}

function attack() {

}