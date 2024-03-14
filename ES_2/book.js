// Задание 1: ""Управление библиотекой книг""

// Реализуйте класс Book, представляющий книгу, со следующими свойствами и методами:

// Свойство title (название) - строка, название книги.
// Свойство author (автор) - строка, имя автора книги.
// Свойство pages (количество страниц) - число, количество страниц в книге.
// Метод displayInfo() - выводит информацию о книге (название, автор и количество страниц).

class Book {
    title = '';
    author = '';
    pages = 0;

    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.displayInfo = this.displayInfo.bind(this);
    }

    displayInfo = () => {
        console.log('Название книги: ', this.title, '\nАвтор: ', this.author, '\nКоличество страниц: ', this.pages);
    }
}

const book1 = new Book('Garry Potter and philosophy stone', 'J.Rowling', 500);
book1.displayInfo();