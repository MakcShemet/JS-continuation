"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Коллекция поваров
const cooks = new Map([
  ['Олег', 'Пицца'],
  ['Андрей', 'Суши'],
  ['Анна', 'Десерт']
]);

// Коллекция меню
const menu = new Map([
  ['Пицца', ['Маргарита', 'Пепперони', 'Три сыра']],
  ['Суши', ['Филадельфия', 'Калифорния', 'Чизмаки', 'Сеякемаки']],
  ['Десерт', ['Тирамису', 'Чизкейк']]
])


// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  allOrders = new Map;

  newOrder(client, ...order) {
    const dishes = [...order];

    // Строка для вывода заказа в консоль
    let resultOrder = '';

    for (const dish of dishes) {
      const { name, quantity, type } = dish;
      let cook;

      if (quantity <= 0) {
        throw new Error(`Указано неверное количество блюд: ${quantity}. Должно быть больше 0`);
      }

      if (menu.has(type) && menu.get(type).includes(name)) {
        // Находим повара для приготовления блюда
        cooks.forEach((value, key) => {
          if (value === type)
            cook = key;
          return cook;
        });
        // Добавляем повара к заказу блюда
        dish.cook = cook;

        // Находим повтор блюда в заказе, подсчитываем общее количество данной продукции и удаляем дубликат
        if (this.allOrders.size > 0 && this.allOrders.has(client)) {
          for (const el of this.allOrders.get(client)) {
            if (name === el.name && type === el.type) {
              dish.quantity += el.quantity;
              this.allOrders.get(client).splice(this.allOrders.get(client).indexOf(el), 1);
            }
          }
        }

      } else {
        throw new Error(`${type} "${name}" - такого блюда не существует`);
        console.error(error);
      }
    }

    // Заполняем коллекцию Map заказами и объединяем разные заказы одного клиента
    if (this.allOrders.has(client)) {
      this.allOrders.set(client, this.allOrders.get(client).concat(dishes));
    } else {
      this.allOrders.set(client, dishes);
    }

    // Берем данные из коллекции заказов и "склеиваем" в строку для вывода
    this.allOrders.get(client).forEach(element => {
      resultOrder = resultOrder.concat(`${element.type} "${element.name}" - ${element.quantity}; готовит повар ${element.cook} \n`);
    });

    console.log(`Клиент ${client.firstname} заказал:\n`.concat(resultOrder));
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"),
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.