(
    function () {
        function verifyDragon(card) {
            return cards[card.id].type.includes('dragon')
        }

        function fortifyAttribute(card, attribute, value) {
            card.querySelector(`#${attribute}Value`).innerText = Number(card.querySelector(`#${attribute}Value`).innerText) + value
            fortifyAnimate(card.querySelector(`#${attribute}Value`))
        }

        function weakAttribute(card, attribute, value, classRemove) {
            let cardAttribute = card.querySelector(`#${attribute}Value`)
            if (cardAttribute.id == 'defenseValue' && Number(cardAttribute.innerText) < 2) {
                return
            }
            cardAttribute.innerText = Number(card.querySelector(`#${attribute}Value`).innerText) - value
            weakAnimate(card.querySelector(`#${attribute}Value`))
            if (classRemove) {
                card.classList.remove(classRemove)
            }
        }

        function fortifyAnimate(attribute) {
            attribute.style.animation = 'attributeFortify .5s'
        }

        function weakAnimate(attribute) {
            attribute.style.animation = 'attributeWeak .5s'
        }

        function verifyFieldEffects() {
            document.querySelectorAll('.player-slot').forEach(slot => {
                if (slot.firstChild) {
                    let effectType = cards[slot.firstChild.id].effectType
                    if (effectType) {
                        if (effectType.includes('onField')) {
                            window[cards[slot.firstChild.id].effect](slot)
                        }
                    }
                }
            })
        }

        function fortifySideDragonsByOne(slot, killed) {
            let slotId = Number(slot.id.slice(5))
            let leftSlot = document.querySelector(`.player-slot#slot-${slotId - 1}`)
            let rightSlot = document.querySelector(`.player-slot#slot-${slotId + 1}`)

            if (killed) {
                if (leftSlot && leftSlot.firstChild && leftSlot.firstChild.classList.contains('fbDragonTrainer')) {
                    weakAttribute(leftSlot.firstChild, 'strength', 1, 'fbDragonTrainer')
                    weakAttribute(leftSlot.firstChild, 'defense', 1, 'fbDragonTrainer')
                }
                if (rightSlot && rightSlot.firstChild && rightSlot.firstChild.classList.contains('fbDragonTrainer')) {
                    weakAttribute(rightSlot.firstChild, 'strength', 1, 'fbDragonTrainer')
                    weakAttribute(rightSlot.firstChild, 'defense', 1, 'fbDragonTrainer')
                }
            } else {
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
        }

        window.fortifySideDragonsByOne = fortifySideDragonsByOne
        window.verifyFieldEffects = verifyFieldEffects
    }
)()

