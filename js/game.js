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

let deck, firstTurn = true, turn = 'player', hand = [], mana, manaind = document.querySelector('.mana-indicator')

gameStart()

window.addEventListener('click', () => {
    manaind.innerText = mana
})

document.querySelector('.coin').addEventListener('click', () => {
    switchTurn()
})

function gameStart() {
    mana = 2
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            createCard()
        }
        document.querySelector('.hand').style.transform = 'translateY(0)'
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
    manaind.innerText = mana
    let coin = document.querySelector('.coin')
    if (turn == 'opponent') {
        turn = 'player'
        coin.style.background = "url('../assets/img/water-gif.gif')"
    } else {
        turn = 'opponent'
        coin.style.background = 'black'
        coin.style.cursor = 'unset'
    }
    if(!firstTurn){
        attack()
    }else{
        firstTurn = false
    }
}

function attack(){
    
}