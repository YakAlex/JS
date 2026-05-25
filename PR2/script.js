"use strict";

alert("Вітаємо! Будь ласка, заповніть коротку анкету.");

// Збір інформації
let userName = prompt("Введіть ваше ім'я:");
let ageInput = prompt("Введіть ваш вік:");
let city = prompt("З якого ви міста?");
let color = prompt("Ваш улюблений колір?");
let isWorking = confirm("Ви зараз працюєте?");

// Перетворення віку на число
let age = Number(ageInput);

// Перевірка на повноліття
let isAdult = age >= 18;

// Вивід типів кожної змінної у консоль
console.log("--- Типи даних ---");
console.log("userName: ", typeof userName);
console.log("age: ", typeof age);
console.log("city: ", typeof city);
console.log("color: ", typeof color);
console.log("isWorking: ", typeof isWorking);
console.log("isAdult: ", typeof isAdult);

// Формування підсумкового результату
let summary = `
    Анкета користувача:
    Ім'я: ${userName}
    Вік: ${age} (Повнолітній: ${isAdult})
    Місто: ${city}
    Улюблений колір: ${color}
    Працює: ${isWorking ? "Так" : "Ні"}
`;

// Відображення результату
alert(summary);
console.log(summary);
