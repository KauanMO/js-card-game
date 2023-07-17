let cards = [
    {
        id: 1,
        name: 'Boxer',
        cost: 1,
        strength: 1,
        defense: 1,
        pic: 'boxer.png',
        effect: ''
    }
]

let deck, hand = [], mana

gameStart()

function gameStart() {
    mana = 2

    for (let i = 0; i < 5; i++) {
        createCard()
    }
    playerTurn()
}

function createCard() {
    let cardInfo = cards[parseInt(Math.random() * 1)]
    const card = document.createElement('div')
    const pic = document.createElement('div')
    const name = document.createElement('span')
    const effect = document.createElement('span')
    const cost = document.createElement('div')
    const strength = document.createElement('span')
    const defense = document.createElement('span')
    const attributes = document.createElement('div')

    card.classList.add('card')
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
        playCard(card.target)
    })

    buyCard(card)
}

function buyCard(card) {
    hand.push(card)

    if (hand.length >= 3) {
        hand.forEach((card, i) => {
            card.classList = ['card']
            card.classList.add(`hand-${hand.length}-card-${i + 1}`)
        })
    }

    document.querySelector('.hand').appendChild(card)
}

function playCard(card) {
    card.style.transform = 'translateY(-16rem)'
    document.querySelector('.hand').style.transform = 'translateY(10rem)'
    let slots = document.querySelectorAll('.slot.player-slot')

    const placeCard = () => {
        
        slots.forEach(naslot => {
            naslot.removeEventListener('click', placeCard)
        })
    }

    slots.forEach(slot => {
        slot.addEventListener('click', placeCard)
    })
}

function playerTurn() {
    document.querySelector('.mana-indicator').innerText = mana


}