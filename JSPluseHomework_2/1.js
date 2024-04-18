"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {

    #books;

    constructor(books) {
        try {
            books.forEach((book) => {
                if (books.indexOf(book) !== books.lastIndexOf(book)) {
                    throw new Error(`Список содержит одиноковые книги: ${book}. Удалите дубликат`);
                }
            });
            this.#books = books;
        } catch (err) {
            console.error(err);
        }
    }

    allBooks() {
        return this.#books;
    }

    addBook(title) {
        try {
            if (!this.#books.includes(title)) {
                this.#books.push(title);
            } else {
                throw new Error(`Книга "${title}" уже существует в библиотеке`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    hasBook(title) {
        return this.#books.includes(title) ? true : false;
    }

    removeBook(title) {
        try {
            if (this.title === this.hasBook(title)) {
                this.#books.splice(this.#books.indexOf(title), 1);
            } else {
                throw new Error(`Книга ${title} не найдена`);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}



const books = ['Ангелы и демоны', 'Инферно', 'Утраченный символ'];

const lib = new Library(books);

console.log(lib.allBooks());
lib.addBook('Учебник JavaScript');
lib.addBook('Учебник JavaScript');
console.log(lib.hasBook('Инферно'));
lib.removeBook('Учебник PHP');
console.log(lib.allBooks());
