import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SeriesCard from './components/SeriesCard';
import EpisodeList from './components/EpisodeList';
import EpisodeView from './components/EpisodeView';
import { tmdbApi } from './services/tmdbApi';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [searching, setSearching] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  useEffect(() => {
    loadPopularSeries();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        loadPopularSeries();
      }
    }, 500);

    return () => clearTimeout(delaySearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const loadPopularSeries = async () => {
    setLoading(true);
    const popularShows = await tmdbApi.getPopularTVShows();
    setSeries(popularShows);
    setLoading(false);
  };

  const handleSearch = async () => {
    setSearching(true);
    const results = await tmdbApi.searchTVShows(searchTerm);
    setSeries(results);
    setSearching(false);
  };

  const handleSeriesSelect = (show) => {
    setSelectedSeries(show);
    setSelectedEpisode(null);
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
  };

  const handleBackToSeries = () => {
    setSelectedSeries(null);
    setSelectedEpisode(null);
  };

  const handleBackToEpisodes = () => {
    setSelectedEpisode(null);
  };

  return (
    <div className="App">
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      
      <div className="container">
        {!selectedSeries && (
          <>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            
            <section className="recommended">
              <h2>{searchTerm ? 'Search Results' : 'Popular Series'}</h2>
              
              {(loading || searching) && (
                <div className="loading">Loading...</div>
              )}
              
              {!loading && !searching && series.length === 0 && (
                <div className="no-results">No series found</div>
              )}
              
              <div className="series-grid">
                {series.map(show => (
                  <SeriesCard 
                    key={show.id} 
                    series={show} 
                    onSelect={handleSeriesSelect}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {selectedSeries && !selectedEpisode && (
          <EpisodeList 
            series={selectedSeries}
            onEpisodeSelect={handleEpisodeSelect}
            onBack={handleBackToSeries}
          />
        )}

        {selectedEpisode && (
          <EpisodeView 
            episode={selectedEpisode}
            series={selectedSeries}
            onBack={handleBackToEpisodes}
          />
        )}
      </div>
    </div>
  );
}

export default App;
