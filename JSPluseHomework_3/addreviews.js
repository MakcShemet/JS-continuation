const submitBtn = document.querySelector('.product__review_btn');

function notEmptyInput(name, review) {
    return (name.value === '' || review.value === '') ? false : true;
}

submitBtn.addEventListener("click", () => {
    const productName = document.querySelector('#name-product');
    const textReview = document.querySelector('.product__review_input');
    const errorMessage = document.querySelector('.error-message');
    const reviewsOnProduct = JSON.parse(localStorage.getItem(productName)) || [];

    if (notEmptyInput(productName, textReview)) {
        reviewsOnProduct.push(textReview.value);
        localStorage.setItem(productName.value, JSON.stringify(reviewsOnProduct));
        productName.value = '';
        textReview.value = '';
    } else {
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = "Поля не должны быть пустыми. Заполните все поля";
    }

});