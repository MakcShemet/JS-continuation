"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв, как и продукт, должен иметь уникальный id, для упрощения, используем 
функцию `uid()`, она нам будет возвращать случайный id в виде небольшой строки.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

function uid() {
  return Math.random().toString(36).slice(2);
}

const initialData = [
  {
    id: uid(),
    product: "Apple iPhone 13",
    reviews: [
      {
        id: uid(),
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: uid(),
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    id: uid(),
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: uid(),
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    id: uid(),
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: uid(),
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];


function createProductList() {
  const catalog = document.querySelector(".products");
  initialData.forEach((item) => {
    const productElem = document.createElement("div");
    catalog.appendChild(productElem);
    productElem.classList.add("product__item");

    const productTitle = document.createElement("h3");
    productElem.appendChild(productTitle);
    productTitle.textContent = item.product;
    productTitle.classList.add("product__item_title");

    const productReviewTitle = document.createElement("h5");
    productElem.appendChild(productReviewTitle);
    productReviewTitle.classList.add("product__review_title");
    productReviewTitle.textContent = "Отзывы:";

    const productReviewBlock = document.createElement("div");
    productElem.appendChild(productReviewBlock);
    productReviewBlock.classList.add("product__review_block");
    productReviewBlock.setAttribute("id", item.id);

    item.reviews.forEach((review) => {
      const productReviewText = document.createElement("p");
      productReviewBlock.appendChild(productReviewText);
      productReviewText.classList.add("product__review_text");
      productReviewText.textContent = review.text;

    });

    const reviewForm = document.createElement("form");
    productElem.appendChild(reviewForm);

    const reviewInput = document.createElement("textarea");
    reviewInput.setAttribute('row', '1');
    reviewInput.setAttribute('placeholder', 'Напишите ваш отзыв (от 50 до 500 знаков)');
    reviewForm.appendChild(reviewInput);
    reviewInput.classList.add("product__review_input");
    reviewInput.addEventListener("focus", () => {
      const invalidInputMsgElem = reviewInput.nextSibling;
      invalidInputMsgElem.style.opacity = "0";
    });

    const invalidReviewText = document.createElement("p");
    reviewForm.appendChild(invalidReviewText);
    invalidReviewText.textContent = "Недопустимое количество знаков в отзыве!";
    invalidReviewText.classList.add("invalid_review_text");

    const reviewSendBtn = document.createElement("button");
    reviewForm.appendChild(reviewSendBtn);
    reviewSendBtn.classList.add("product__review_btn");
    reviewSendBtn.setAttribute('type', 'button');
    reviewSendBtn.textContent = "отправить отзыв";
    reviewSendBtn.onclick = () => addReview(reviewSendBtn.previousSibling.previousSibling, item.id);
  });
}

createProductList();

function addReview(inputElem, reviewBlockId) {
  if (inputElem.value.length < 50 || inputElem.value.length > 500)
    inputElem.nextSibling.style.opacity = "1";
  else {
    const productReviewBlock = document.getElementById(reviewBlockId);

    const productReviewText = document.createElement("p");
    productReviewBlock.appendChild(productReviewText);
    productReviewText.classList.add("product__review_text");
    productReviewText.textContent = inputElem.value;

    inputElem.nextSibling.style.opacity = "0";
    inputElem.value = "";
  }
}
