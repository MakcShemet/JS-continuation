'use strict'

const sheduleEl = document.querySelector('.shedule');

const shedule = JSON.parse(localStorage.getItem('shedule'));

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
    maxParticipantsEl.classList.add('maxParticipants');
    maxParticipantsEl.textContent = `Группа (макс.): ${objTraining.maxParticipants}`;
    trainingEl.append(maxParticipantsEl);

    const currentParticipantsEl = document.createElement('div');
    currentParticipantsEl.classList.add('currentParticipants');
    currentParticipantsEl.textContent = `Записалось: ${objTraining.currentParticipants}`;
    trainingEl.append(currentParticipantsEl);

    const buttonsBlock = document.createElement('div');
    buttonsBlock.classList.add('buttons-block');
    trainingEl.append(buttonsBlock);

    const signUpBtn = document.createElement('button');
    (objTraining.currentParticipants === objTraining.maxParticipants || objTraining.flag === true) ?
        signUpBtn.className = 'deactivate' :
        signUpBtn.classList.add('sign-up');
    signUpBtn.textContent = 'Записаться';
    buttonsBlock.append(signUpBtn);

    const cancelBtn = document.createElement('button');
    objTraining.flag === true ?
        cancelBtn.classList.add('cancel') :
        cancelBtn.className = 'deactivate';
    cancelBtn.textContent = 'Отмена';
    buttonsBlock.append(cancelBtn);
});