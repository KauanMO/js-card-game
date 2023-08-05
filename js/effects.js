(
    function () {
        function verifyDragon(card) {
            return cards[card.id].type.includes('dragon')
        }

        function fortifyAttribute(card, attribute, aumento) {
            card.querySelector(`#${attribute}Value`).innerText = Number(card.querySelector(`#${attribute}Value`).innerText) + aumento
            fortifyAnimate(card.querySelector(`#${attribute}Value`))
        }

        function fortifyAnimate(attribute) {
            attribute.style.animation = 'attributeFortify .3s'
        }

        function verifyFieldEffects() {
            document.querySelectorAll('.player-slot').forEach(slot=>{
                if(slot.firstChild){
                    let effect = cards[slot.firstChild.id].effect ?? null
                    
                    if(effect){
                        console.log(effect)
                    }
                }
            })
        }

        function fortifySideDragonsByOne(slot) {
            let slotId = Number(slot.id.slice(5))
            let leftSlot = document.querySelector(`.player-slot#slot-${slotId - 1}`)
            let rightSlot = document.querySelector(`.player-slot#slot-${slotId + 1}`)

            if (leftSlot && leftSlot.firstChild && verifyDragon(leftSlot.firstChild)) {
                fortifyAttribute(leftSlot.firstChild, 'strength', 1)
                fortifyAttribute(leftSlot.firstChild, 'defense', 1)
            }
            if (rightSlot && rightSlot.firstChild && verifyDragon(rightSlot.firstChild)) {
                fortifyAttribute(rightSlot.firstChild, 'strength', 1)
                fortifyAttribute(rightSlot.firstChild, 'defense', 1)
            }
        }

        window.fortifySideDragonsByOne = fortifySideDragonsByOne
        window.verifyFieldEffects = verifyFieldEffects
    }
)()

