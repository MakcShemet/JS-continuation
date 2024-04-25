'use strict'

const sheduleEl = document.querySelector('.shedule');

const shedule = JSON.parse(localStorage.getItem('shedule'));
console.log(shedule);

shedule.forEach(objTraining => {
    const trainingEl = document.createElement('div')
    trainingEl.classList.add('training');
    trainingEl.id = objTraining.id;
    sheduleEl.append(trainingEl);

    const titleName = document.createElement('h3');
    titleName.textContent = objTraining.name;
    trainingEl.append(titleName);

    const trainingTime = document.createElement('div');
    trainingTime.classList.add('time-training');
    trainingTime.textContent = `Время тренировки: ${objTraining.time}`;
    trainingEl.append(trainingTime);

    const maxParticipantsEl = document.createElement('div');
    maxParticipantsEl.textContent = `Группа (макс.): ${objTraining.maxParticipants}`;
    trainingEl.append(maxParticipantsEl);

    const currentParticipantsEl = document.createElement('div');
    currentParticipantsEl.textContent = `Записалось: ${objTraining.currentParticipants}`;
    trainingEl.append(currentParticipantsEl);

    const buttonsBlock = document.createElement('div');
    buttonsBlock.classList.add('buttons-block');
    trainingEl.append(buttonsBlock);

    const signUpBtn = document.createElement('button');
    objTraining.currentParticipants === objTraining.maxParticipants ?
        signUpBtn.classList.add('deactivate') :
        signUpBtn.classList.add('sign-up');
    signUpBtn.textContent = 'Записаться';
    buttonsBlock.append(signUpBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel');
    cancelBtn.textContent = 'Отмена';
    buttonsBlock.append(cancelBtn);
});