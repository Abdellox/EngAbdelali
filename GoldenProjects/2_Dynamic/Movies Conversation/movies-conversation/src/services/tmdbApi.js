const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'demo';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = {
  // Search for TV shows
  searchTVShows: async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching TV shows:', error);
      return [];
    }
  },

  // Get popular TV shows
  getPopularTVShows: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      return [];
    }
  },

  // Get TV show details
  getTVShowDetails: async (tvId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      return null;
    }
  },

  // Get season details with episodes
  getSeasonDetails: async (tvId, seasonNumber) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching season details:', error);
      return null;
    }
  },

  // Get episode details
  getEpisodeDetails: async (tvId, seasonNumber, episodeNumber) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching episode details:', error);
      return null;
    }
  },

  // Get image URL with optional size
  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750/1a1a1a/666?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
};
