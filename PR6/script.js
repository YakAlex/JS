"use strict";

import { greet, add, multiply, sumAll, createProfile } from "./utils.js";
import { userProfile, groupA_Stats, groupB_Stats } from "./data.js";

const { firstName, age, location: { city }, skills } = userProfile;
const combinedStats = [...groupA_Stats, ...groupB_Stats, 60, 70];
const totalSum = sumAll(...combinedStats);
const newAcc = createProfile(firstName, age, "Frontend Developer");

const html = `
    <h2>Дані (Деструктуризація)</h2>
    <p>Ім'я: ${firstName}, Вік: ${age}, Місто: ${city}</p>
    <p>Навички: ${skills.join(", ")}</p>
    <p>Привітання: ${greet(firstName)}</p>
    
    <h2>Утиліти (Spread / Rest)</h2>
    <p>10 + 5 = ${add(10, 5)}</p>
    <p>Об'єднаний масив: [${combinedStats.join(", ")}]</p>
    <p>Сума всіх елементів (Rest): ${totalSum}</p>
    <p>Enhanced Object: ${newAcc.getSummary()}</p>
`;
document.getElementById("app").innerHTML = html;
