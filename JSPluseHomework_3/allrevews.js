const ulElement = document.querySelector('.list__review');

let keys = Object.keys(localStorage);

keys.forEach(key => {
    const listElement = document.createElement('li');
    listElement.classList.add('list__review_item')
    listElement.textContent = key;

    const vewBtn = document.createElement('details');
    const summaryElement = document.createElement('summary');
    summaryElement.textContent = "Открыть";

    vewBtn.addEventListener('click', () => {
        if (!vewBtn.open) {
            summaryElement.textContent = "Закрыть";
        } else {
            summaryElement.textContent = "Открыть";
        }
    });

    let reviewText = JSON.parse(localStorage.getItem(key));
    reviewText.forEach(reviewElement => {
        const review = document.createElement('div');
        review.classList.add('review');
        review.textContent = reviewElement;
        vewBtn.appendChild(review);

        const removeReviewBtn = document.createElement('button');
        removeReviewBtn.classList.add('remove-review');
        removeReviewBtn.textContent = "Удалить";
        review.append(removeReviewBtn);

        removeReviewBtn.addEventListener('click', () => {
            const indexEl = reviewText.indexOf(reviewElement);
            reviewText.splice(indexEl, 1);

            if (reviewText.length > 0) {
                review.remove();
                localStorage.setItem(key, JSON.stringify(reviewText));
            } else {
                listElement.remove();
                localStorage.removeItem(key);
            }
        })

    });



    ulElement.append(listElement);
    listElement.append(vewBtn);
    vewBtn.append(summaryElement);
})