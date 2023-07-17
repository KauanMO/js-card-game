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

let deck, hand = []

gameStart()

function gameStart() {
    for (let i = 0; i < 5; i++) {
        createCard()
    }
}

function createCard() {
    let cardInfo = cards[parseInt(Math.random() * 1)]
    const card = document.createElement('div')
    const pic = document.createElement('div')
    const name = document.createElement('span')
    
    name.classList.add('cardName')
    name.innerText = cardInfo.name

    pic.classList.add('card-pic')
    pic.style.background = `center url(../assets/img/${cardInfo.pic}) no-repeat`
    pic.style.backgroundSize = 'cover'

    card.classList.add('card')
    card.appendChild(pic)
    card.appendChild(name)

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