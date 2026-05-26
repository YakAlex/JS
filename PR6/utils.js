"use strict";

export const greet = (name = "Шановний гість") => `Привіт, ${name}! Вітаємо у системі.`;
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

export const sumAll = (...nums) => {
    return nums.reduce((acc, num) => acc + num, 0);
};

export const createProfile = (name, age, role) => {
    return {
        name,
        age,
        role,
        getSummary() {
            return `${this.name} (${this.role})`;
        }
    };
};
