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
            document.querySelectorAll('.player-slot').forEach(slot => {
                if (slot.firstChild) {
                    let effectType = cards[slot.firstChild.id].effectType
                    if (effectType && effectType.includes('onField')) {
                        console.log(effectType)
                        window[cards[slot.firstChild.id].effect](slot)
                    }
                }
            })
        }

        function fortifySideDragonsByOne(slot) {
            let slotId = Number(slot.id.slice(5))
            let leftSlot = document.querySelector(`.player-slot#slot-${slotId - 1}`)
            let rightSlot = document.querySelector(`.player-slot#slot-${slotId + 1}`)

            if (leftSlot && leftSlot.firstChild && verifyDragon(leftSlot.firstChild) && !(leftSlot.firstChild.classList.contains('fbDragonTrainer'))) {
                fortifyAttribute(leftSlot.firstChild, 'strength', 1)
                fortifyAttribute(leftSlot.firstChild, 'defense', 1)
                leftSlot.firstChild.classList.add('fbDragonTrainer')
            }
            if (rightSlot && rightSlot.firstChild && verifyDragon(rightSlot.firstChild) && !(rightSlot.firstChild.classList.contains('fbDragonTrainer'))) {
                fortifyAttribute(rightSlot.firstChild, 'strength', 1)
                fortifyAttribute(rightSlot.firstChild, 'defense', 1)
                rightSlot.firstChild.classList.add('fbDragonTrainer')
            }
        }

        window.fortifySideDragonsByOne = fortifySideDragonsByOne
        window.verifyFieldEffects = verifyFieldEffects
    }
)()

