const submitBtn = document.querySelector('.product__review_btn');

function notEmptyInput(name, review) {
    return (name === '' || review === '') ? false : true;
}

submitBtn.addEventListener("click", () => {
    const productName = document.querySelector('#name-product').value;
    const textReview = document.querySelector('.product__review_input').value;
    const errorMessage = document.querySelector('.error-message');
    const reviewsOnProduct = JSON.parse(localStorage.getItem(productName)) || [];

    if (notEmptyInput(productName, textReview)) {
        reviewsOnProduct.push(textReview);
        localStorage.setItem(productName, JSON.stringify(reviewsOnProduct));
    } else {
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = "Поля не должны быть пустыми. Заполните все поля";

    }
});