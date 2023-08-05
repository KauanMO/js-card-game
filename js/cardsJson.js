const cards = [
    // {
    //     name: 'Boxer',
    //     type: ['human', 'fighter'],
    //     cost: 1,
    //     strength: 1,
    //     defense: 1,
    //     pic: 'boxer.png'
    // },
    {
        name: 'Dragon',
        type: ['dragon'],
        cost: 3,
        strength: 3,
        defense: 3,
        pic: 'dragon.png'
    },
    // {
    //     name: 'DbCM',
    //     type: ['machine', 'cute'],
    //     cost: 2,
    //     strength: 2,
    //     defense: 1,
    //     pic: 'DbCM.png'
    // },
    // {
    //     name: 'Stone Giant',
    //     type: ['stone', 'giant'],
    //     cost: 3,
    //     strength: 1,
    //     defense: 3,
    //     pic: 'stoneGiant.png'
    // },
    {
        name: 'Dragon Trainer',
        type: ['human'],
        cost: 2,
        strength: 1,
        defense: 2,
        pic: 'dragonTrainer.png',
        effectLabel: 'Fortalece 1 ponto de ataque e defesa de todos as cartas do tipo dragão adjacentes',
        effect: 'fortifySideDragonsByOne',
        effectType: ['placed']
    }
]