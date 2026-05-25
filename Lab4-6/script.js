"use strict";

const API_URL = "https://api.tvmaze.com/shows";
const moviesContainer = document.getElementById("moviesContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const loader = document.getElementById("loader");

let allMovies = []; 

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Помилка HTTP: ${response.status} ${response.statusText}`);
        
        const data = await response.json();
        allMovies = data; 
        
        loader.style.display = 'none';
        renderMovies(allMovies);
    } catch (error) {
        console.error("Помилка завантаження API:", error);
        loader.style.display = 'none';
        moviesContainer.innerHTML = `<p class="error-msg">❌ Не вдалося завантажити дані: ${error.message}</p>`;
    }
}

function renderMovies(moviesArray) {
    moviesContainer.innerHTML = ""; 
    
    if (moviesArray.length === 0) {
        moviesContainer.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>Фільмів не знайдено.</p>";
        return;
    }

    const fragment = document.createDocumentFragment();

    moviesArray.forEach(movie => {
        const { name, image, rating, genres } = movie;
        const imageUrl = image ? image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
        const movieRating = rating && rating.average ? rating.average : 'N/A';
        const genresList = genres ? genres.join(', ') : 'Невідомо';

        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${imageUrl}" alt="Постер ${name}" loading="lazy">
            <div class="movie-info">
                <h3>${name}</h3>
                <p>Жанри: ${genresList}</p>
                <p class="rating">⭐ Рейтинг: ${movieRating}</p>
            </div>
        `;
        fragment.appendChild(card);
    });

    moviesContainer.appendChild(fragment);
}

function handleFilterAndSort() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortType = sortSelect.value;
    
    let filtered = allMovies.filter(movie => 
        movie.name.toLowerCase().includes(searchTerm)
    );
    
    if (sortType === "ratingDesc") {
        filtered.sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
    } else if (sortType === "ratingAsc") {
        filtered.sort((a, b) => (a.rating.average || 0) - (b.rating.average || 0));
    } else if (sortType === "nameAsc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    renderMovies(filtered);
}

searchInput.addEventListener("input", handleFilterAndSort);
sortSelect.addEventListener("change", handleFilterAndSort);

document.addEventListener("DOMContentLoaded", fetchMovies);
