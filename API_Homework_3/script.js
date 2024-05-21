import { getLikes, addLike, historyImage } from "./storage.js";
import { APIkey } from "./app.js";


const url = `https://api.unsplash.com/photos/random`;

async function getImages(url) {
    const response = await fetch(url, {
        headers: { Authorization: `Client-ID ` + APIkey }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const json = await response.json();
    return json;
};

(async function () {
    try {
        const result = await getImages(url);
        console.log(result);
        newImages(result);
    } catch (error) {
        alert(error);
    }
})();

function newImages(photo) {
    const photoDivEl = document.querySelector('.photo');
    photoDivEl.insertAdjacentHTML('beforeend', `
    <img class="image" src="${photo.urls.regular}">`);

    const photoInfoEl = document.querySelector('#photo-info');
    photoInfoEl.insertAdjacentHTML('beforeend', `
    <p class="authorPhoto">${photo.user.first_name}</p>
    <button class="like"></button>
    `);
    const buttonLike = document.querySelector('.like');
    buttonLike.addEventListener('click', () => {
        addLike(photo.id, photo.likes, photo.links.download);
    });

    const btnPrevEl = document.querySelector('.prev-btn');
    btnPrevEl.addEventListener('click', () => {
        let storageUrl = historyImage(photo.id);
        photoDivEl.insertAdjacentHTML('beforeend', `
    <img class="photo" src="${storageUrl}">`);
    });
};