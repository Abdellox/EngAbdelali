/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const movies = [
    { title: 'The Matrix', year: 1999, genre: 'Sci-Fi', rating: 8.7 },
    { title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8 },
    { title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 9.0 },
    { title: 'Pulp Fiction', year: 1994, genre: 'Crime', rating: 8.9 },
    { title: 'Forrest Gump', year: 1994, genre: 'Drama', rating: 8.8 }
];

function searchMovies() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('results');
    
    if (!query) {
        results.innerHTML = '<p>Enter a movie title to search</p>';
        return;
    }
    
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    
    if (filtered.length === 0) {
        results.innerHTML = '<p>No movies found</p>';
        return;
    }
    
    results.innerHTML = filtered.map(m => `
        <div class="movie-card">
            <h3>${m.title}</h3>
            <p>Year: ${m.year}</p>
            <p>Genre: ${m.genre}</p>
            <p>Rating: ⭐ ${m.rating}/10</p>
        </div>
    `).join('');
}

console.log('Movie Search - Built by Abdel Ali');
