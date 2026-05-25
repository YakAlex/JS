"use strict";

// Каррована функція верхнього рівня для створення конвертерів
function createConverter(multiplier) {
    return function(offset) {
        return function(direction) {
            return function(temperatureValue) {
                if (direction === "C to F") {
                    return (temperatureValue * multiplier) + offset;
                } else if (direction === "F to C") {
                    return (temperatureValue - offset) / multiplier;
                } else {
                    return null;
                }
            };
        };
    };
}

// Ініціалізація базових параметрів (часткове застосування)
const baseConverter = createConverter(1.8)(32);
const convertCelsiusToFahrenheit = baseConverter("C to F");
const convertFahrenheitToCelsius = baseConverter("F to C");

// Керуюча функція
function runTemperatureCalculator() {
    let rawInput = prompt("Введіть числове значення температури:");
    let direction = prompt("Введіть напрямок конвертації (C to F або F to C):");
    
    let temperature = Number(rawInput);
    
    if (isNaN(temperature) || rawInput.trim() === "") {
        alert("Помилка: Введено некоректне числове значення!");
        return;
    }
    
    let result = null;
    let unitSymbol = "";
    
    if (direction === "C to F") {
        result = convertCelsiusToFahrenheit(temperature);
        unitSymbol = "°F";
    } else if (direction === "F to C") {
        result = convertFahrenheitToCelsius(temperature);
        unitSymbol = "°C";
    } else {
        alert("Помилка: Неправильний напрямок!");
        return;
    }
    
    let message = `Результат конвертації: ${result.toFixed(2)} ${unitSymbol}`;
    alert(message);
    console.log(message);
}

runTemperatureCalculator();
