(
    function () {

        function verifyDragon(card) {
            console.log(card);
        }

        function fortifySideDragonsByOne(slot) {
            let slotId = Number(slot.id.slice(5))
            let leftSlot = document.querySelector(`.player-slot#slot-${slotId - 1}`)
            let rightSlot = document.querySelector(`.player-slot#slot-${slotId + 1}`)

            console.log(slotId, leftSlot, rightSlot);
            if (leftSlot.firstChild) {
                verifyDragon(leftSlot.firstChild)
            }
            
        }

        window.fortifySideDragonsByOne = fortifySideDragonsByOne
    }
)()

