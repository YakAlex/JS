"use strict";

class AppUser {
    constructor(name, age, profession) {
        this._name = name;
        this.age = age; // Використовує setter
        this.profession = profession;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        const parsedAge = Number(value);
        if (isNaN(parsedAge) || parsedAge <= 0) {
            throw new Error("Вік повинен бути додатним числом!");
        }
        this._age = parsedAge;
    }

    display() {
        return `Користувач: ${this._name}, Вік: ${this.age}, Професія: ${this.profession}`;
    }
}

class Admin extends AppUser {
    constructor(name, age, profession, role) {
        super(name, age, profession);
        this.role = role;
    }

    // Поліморфізм
    display() {
        return `[ADMIN] ${super.display()} | Права: ${this.role}`;
    }
}

try {
    const uName = prompt("Введіть ім'я:");
    const uAge = prompt("Введіть вік:");
    const uProf = prompt("Введіть професію:");
    const isAdmin = confirm("Цей користувач є адміністратором?");
    
    let newUser;
    if (isAdmin) {
        const uRole = prompt("Введіть роль (наприклад, Root):");
        newUser = new Admin(uName, uAge, uProf, uRole);
    } else {
        newUser = new AppUser(uName, uAge, uProf);
    }
    
    alert("Успішно створено!\n" + newUser.display());
    console.log(newUser.display());

} catch (error) {
    alert(`Помилка: ${error.message}`);
}
