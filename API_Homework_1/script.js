'use strict'

const buttonsGroup = document.querySelectorAll('.buttons-block')


buttonsGroup.forEach(buttons => {
    const trainingEl = buttons.closest('.training');
    const currentParticipantsEl = trainingEl.querySelector('.currentParticipants');

    buttons.addEventListener('click', (e) => {
        if (e.target.classList.contains('sign-up')) {
            shedule.forEach(training => {
                if (trainingEl.id == training.id) {
                    training.currentParticipants += 1;
                    training.flag = true;
                    localStorage.setItem('shedule', JSON.stringify(shedule));
                    // training.currentParticipants = JSON.stringify(training.currentParticipants);
                    currentParticipantsEl.textContent = `Записалось: ${training.currentParticipants}`;
                    e.target.className = 'deactivate';
                    e.target.nextSibling.className = 'cancel';
                }
            });

        }
        if (e.target.classList.contains('cancel')) {
            shedule.forEach(training => {
                if (trainingEl.id == training.id) {
                    training.currentParticipants -= 1;
                    localStorage.setItem('shedule', JSON.stringify(shedule));
                    currentParticipantsEl.textContent = `Записалось: ${training.currentParticipants}`;
                    e.target.className = 'deactivate';
                    e.target.previousSibling.className = 'sign-up';
                    training.flag = false;
                    console.log(training.currentParticipants);
                }

            });
        }
    })
});