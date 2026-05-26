"use strict";

// Завдання 3
const loadUsersBtn = document.getElementById("loadUsersBtn");
const usersOutput = document.getElementById("usersOutput");

if (loadUsersBtn) {
    loadUsersBtn.addEventListener("click", async () => {
        try {
            usersOutput.textContent = "Завантаження...";
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!res.ok) throw new Error(`Помилка сервера: ${res.status}`);
            const data = await res.json();
            usersOutput.textContent = JSON.stringify(data, null, 2);
        } catch (err) {
            usersOutput.textContent = `Помилка: ${err.message}`;
        }
    });
}

// Завдання 4
const pokeInput = document.getElementById("pokeInput");
const loadPokemonBtn = document.getElementById("loadPokemonBtn");
const pokemonContainer = document.getElementById("pokemonContainer");

if (loadPokemonBtn) {
    loadPokemonBtn.addEventListener("click", async () => {
        const query = pokeInput.value.trim().toLowerCase();
        if (!query) return; 
        
        pokemonContainer.innerHTML = `<p>Шукаю покемона ${query}...</p>`;

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!response.ok) {
                throw new Error(response.status === 404 ? "Покемона не знайдено!" : `Помилка: ${response.status}`);
            }
            const pokemon = await response.json();
            
            const typesHtml = pokemon.types.map(t => `<span class="poke-type">${t.type.name}</span>`).join(" ");
            const spriteUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
            
            pokemonContainer.innerHTML = `
                <div class="pokemon-card">
                    <div class="poke-header">
                        <span class="poke-id">#${pokemon.id.toString().padStart(3, '0')}</span>
                        <h3 class="poke-name">${pokemon.name.toUpperCase()}</h3>
                    </div>
                    <img src="${spriteUrl}" alt="${pokemon.name}" class="poke-image" style="width:150px;">
                    <div class="poke-stats">
                        <p>Зріст: ${pokemon.height / 10} м</p>
                        <p>Вага: ${pokemon.weight / 10} кг</p>
                    </div>
                    <div class="poke-types">${typesHtml}</div>
                </div>
            `;
        } catch (error) {
            pokemonContainer.innerHTML = `<div style="color:red;">❌ ${error.message}</div>`;
        }
    });
}
