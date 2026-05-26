"use strict";

// ==========================================
// 1. ФУНКЦІОНАЛЬНИЙ МОДУЛЬ (ЗАМИКАННЯ ТА КАРРІНГ)
// ==========================================

// Замикання для логування кількості генерацій резюме
const createCounter = () => {
    let count = 0;
    return () => {
        count++;
        return count;
    };
};
const resumeGenerationCounter = createCounter();

// Каррінг для універсальної валідації текстових даних за довжиною
const validateLength = (minLength) => (maxLength) => (value) => {
    const trimmed = value.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
};

const validateName = validateLength(2)(50);
const validateTextCommon = validateLength(2)(100);

// Каррінг для перевірки та приведення до числового типу
const convertAndValidateNumber = (min) => (max) => (value) => {
    const num = Number(value);
    if (isNaN(num)) return { valid: false, value: null };
    return { valid: num >= min && num <= max, value: num };
};
const validateAge = convertAndValidateNumber(16)(100);
const validateExperienceYears = convertAndValidateNumber(0)(60);

// ==========================================
// 2. ОБ'ЄКТНО-ОРІЄНТОВАНИЙ МОДУЛЬ (ES6 КЛАСИ)
// ==========================================

// Базовий абстрактний клас для секцій резюме
class ResumeSection {
    constructor(title) {
        if (this.constructor === ResumeSection) {
            throw new Error("Не можна створювати екземпляр абстрактного класу");
        }
        this._sectionTitle = title;
    }
    get sectionTitle() { return this._sectionTitle; }
}

class PersonalInfo extends ResumeSection {
    constructor(fullName, age, email) {
        super("Особисті дані");
        this.fullName = fullName;
        this.age = age;
        this.email = email;
    }
    
    get fullName() { return this._fullName; }
    set fullName(value) {
        if (!validateName(value)) throw new Error("Некоректне ім'я");
        this._fullName = value;
    }

    get email() { return this._email; }
    set email(value) {
        if (!value.includes("@")) throw new Error("Некоректний Email");
        this._email = value;
    }
}

class Education extends ResumeSection {
    constructor(institution, specialty) {
        super("Освіта");
        if (!validateTextCommon(institution) || !validateTextCommon(specialty)) {
            throw new Error("Некоректні дані у блоці освіти");
        }
        this.institution = institution;
        this.specialty = specialty;
    }
}

class Experience extends ResumeSection {
    constructor(company, role, years) {
        super("Досвід роботи");
        this.company = company || "Не вказано";
        this.role = role || "Не вказано";
        this.years = years;
    }
}

class Skills extends ResumeSection {
    constructor(skillsArray) {
        super("Професійні навички");
        this.skillsList = skillsArray.map(s => s.trim()).filter(s => s.length > 0);
    }
}

class Resume {
    constructor(personalInfo, education, experience, skills) {
        this.personalInfo = personalInfo;
        this.education = education;
        this.experience = experience;
        this.skills = skills;
    }

    // Метод динамічного рендерингу структури через чисті DOM методи
    render() {
        const container = document.createElement("div");
        container.className = "rendered-cv";

        // Шапка резюме
        const header = document.createElement("div");
        header.className = "cv-header";
        const nameEl = document.createElement("h3");
        nameEl.textContent = this.personalInfo.fullName;
        const detailsEl = document.createElement("p");
        detailsEl.textContent = `Вік: ${this.personalInfo.age} | Email: ${this.personalInfo.email}`;
        header.appendChild(nameEl);
        header.appendChild(detailsEl);
        container.appendChild(header);

        // Секція Освіти
        const eduSec = document.createElement("div");
        eduSec.className = "cv-section";
        const eduTitle = document.createElement("h4");
        eduTitle.textContent = this.education.sectionTitle;
        const eduContent = document.createElement("p");
        eduContent.innerHTML = `<strong>${this.education.institution}</strong> — <em>${this.education.specialty}</em>`;
        eduSec.appendChild(eduTitle);
        eduSec.appendChild(eduContent);
        container.appendChild(eduSec);

        // Секція Досвіду
        const expSec = document.createElement("div");
        expSec.className = "cv-section";
        const expTitle = document.createElement("h4");
        expTitle.textContent = this.experience.sectionTitle;
        const expContent = document.createElement("p");
        expContent.innerHTML = `Компанія: <strong>${this.experience.company}</strong><br>Посада: ${this.experience.role}<br>Стаж: ${this.experience.years} р.`;
        expSec.appendChild(expTitle);
        expSec.appendChild(expContent);
        container.appendChild(expSec);

        // Секція Навичок
        const skillsSec = document.createElement("div");
        skillsSec.className = "cv-section";
        const skillsTitle = document.createElement("h4");
        skillsTitle.textContent = this.skills.sectionTitle;
        const skillsListEl = document.createElement("p");
        skillsListEl.textContent = this.skills.skillsList.join(", ") || "Навички відсутні";
        skillsSec.appendChild(skillsTitle);
        skillsSec.appendChild(skillsListEl);
        container.appendChild(skillsSec);

        return container;
    }
}

// ==========================================
// 3. ІНТЕГРАЦІЙНИЙ МОДУЛЬ (DOM CONTROLLER & LOCALSTORAGE)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm");
    const preview = document.getElementById("resumePreview");
    const btnClear = document.getElementById("btnClearStorage");

    const loadFromLocalStorage = () => {
        const savedData = localStorage.getItem("appResumeState");
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                document.getElementById("fullName").value = data.fullName || "";
                document.getElementById("userAge").value = data.age || "";
                document.getElementById("userEmail").value = data.email || "";
                document.getElementById("eduInst").value = data.institution || "";
                document.getElementById("eduSpec").value = data.specialty || "";
                document.getElementById("expCompany").value = data.company || "";
                document.getElementById("expRole").value = data.role || "";
                document.getElementById("expYears").value = data.expYears || "";
                document.getElementById("skillsList").value = data.skillsRaw || "";
            } catch (err) {
                console.error("Помилка парсингу localStorage:", err);
            }
        }
    };

    loadFromLocalStorage();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const rawName = document.getElementById("fullName").value;
        const rawAge = document.getElementById("userAge").value;
        const rawEmail = document.getElementById("userEmail").value;
        const rawInst = document.getElementById("eduInst").value;
        const rawSpec = document.getElementById("eduSpec").value;
        const rawCompany = document.getElementById("expCompany").value;
        const rawRole = document.getElementById("expRole").value;
        const rawExpYears = document.getElementById("expYears").value;
        const rawSkills = document.getElementById("skillsList").value;

        const ageValidation = validateAge(rawAge);
        if (!ageValidation.valid) {
            alert("Помилка: Вік повинен бути числом від 16 до 100 років!");
            return;
        }

        const expValidation = validateExperienceYears(rawExpYears || "0");
        if (!expValidation.valid) {
            alert("Помилка: Досвід роботи має бути додатним числом!");
            return;
        }

        try {
            const personal = new PersonalInfo(rawName, ageValidation.value, rawEmail);
            const education = new Education(rawInst, rawSpec);
            const experience = new Experience(rawCompany, rawRole, expValidation.value);
            const skills = new Skills(rawSkills.split(","));

            const currentResume = new Resume(personal, education, experience, skills);

            preview.innerHTML = "";
            preview.appendChild(currentResume.render());

            const stateToSave = {
                fullName: rawName, age: ageValidation.value, email: rawEmail,
                institution: rawInst, specialty: rawSpec,
                company: rawCompany, role: rawRole, expYears: expValidation.value,
                skillsRaw: rawSkills
            };
            localStorage.setItem("appResumeState", JSON.stringify(stateToSave));

            const currentId = resumeGenerationCounter();
            console.log(`Резюме згенеровано. Операція №${currentId}`);

        } catch (error) {
            alert(`Помилка: ${error.message}`);
        }
    });

    btnClear.addEventListener("click", () => {
        localStorage.removeItem("appResumeState");
        form.reset();
        preview.innerHTML = `<p class="placeholder-text">Заповніть форму ліворуч для генерації резюме...</p>`;
    });
});
