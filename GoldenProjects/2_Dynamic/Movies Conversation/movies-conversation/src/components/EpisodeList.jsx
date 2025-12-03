import React, { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';

function EpisodeList({ series, onEpisodeSelect, onBack }) {
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadSeriesDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series.id]);

  useEffect(() => {
    if (seriesDetails && activeTab === 'episodes') {
      loadSeasonEpisodes(selectedSeason);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeason, seriesDetails, activeTab]);

  const loadSeriesDetails = async () => {
    const details = await tmdbApi.getTVShowDetails(series.id);
    setSeriesDetails(details);
    setLoading(false);
  };

  const loadSeasonEpisodes = async (seasonNumber) => {
    setLoading(true);
    const seasonData = await tmdbApi.getSeasonDetails(series.id, seasonNumber);
    if (seasonData && seasonData.episodes) {
      setEpisodes(seasonData.episodes);
    }
    setLoading(false);
  };

  if (!seriesDetails) {
    return <div className="loading">Loading series details...</div>;
  }

  return (
    <div>
      <button onClick={onBack} className="back-button">← Back to Browse</button>
      
      <div className="series-page">
        <div className="series-main-content">
          <div className="series-title-section">
            <h1>{seriesDetails.name}</h1>
            <p className="series-subtitle">
              {seriesDetails.first_air_date && new Date(seriesDetails.first_air_date).getFullYear()}
              {seriesDetails.last_air_date && seriesDetails.status === 'Ended' && 
                ` - ${new Date(seriesDetails.last_air_date).getFullYear()}`}
            </p>
          </div>

          <div className="series-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'episodes' ? 'active' : ''}`}
              onClick={() => setActiveTab('episodes')}
            >
              Episodes
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div>
                <p className="series-overview">{seriesDetails.overview}</p>
                
                {seriesDetails.created_by && seriesDetails.created_by.length > 0 && (
                  <>
                    <h3 className="section-title">Created By</h3>
                    <div className="crew-grid">
                      {seriesDetails.created_by.map((creator, index) => (
                        <div key={index} className="crew-card">
                          <div className="crew-name">{creator.name}</div>
                          <div className="crew-job">Creator</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {seriesDetails.production_companies && seriesDetails.production_companies.length > 0 && (
                  <>
                    <h3 className="section-title">Production Companies</h3>
                    <div className="crew-grid">
                      {seriesDetails.production_companies.map((company, index) => (
                        <div key={index} className="crew-card">
                          <div className="crew-name">{company.name}</div>
                          {company.origin_country && (
                            <div className="crew-job">{company.origin_country}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'episodes' && (
              <div>
                <div className="season-selector">
                  <label>Season: </label>
                  <select 
                    value={selectedSeason} 
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="season-dropdown"
                  >
                    {Array.from({ length: seriesDetails.number_of_seasons }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>Season {num}</option>
                    ))}
                  </select>
                </div>
                
                {loading && <div className="loading">Loading episodes...</div>}
                
                {!loading && episodes.length === 0 && (
                  <div className="no-results">No episodes found</div>
                )}
                
                {!loading && episodes.length > 0 && (
                  <div className="episodes-grid">
                    {episodes.map((episode) => (
                      <div 
                        key={episode.id} 
                        className="episode-card"
                        onClick={() => onEpisodeSelect({ ...episode, seriesId: series.id })}
                      >
                        <div className="episode-number-badge">
                          S{episode.season_number}E{episode.episode_number}
                        </div>
                        <div className="episode-details">
                          <div className="episode-title">{episode.name}</div>
                          <div className="episode-meta">
                            {episode.air_date && new Date(episode.air_date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                            {episode.vote_average > 0 && ` • ⭐ ${episode.vote_average.toFixed(1)}`}
                          </div>
                          {episode.overview && (
                            <div className="episode-summary">{episode.overview}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="series-sidebar">
          <div className="info-box">
            <div className="info-box-header">{seriesDetails.name}</div>
            <img 
              src={tmdbApi.getImageUrl(seriesDetails.poster_path)} 
              alt={seriesDetails.name}
              className="info-box-image"
            />
            <div className="info-box-content">
              <div className="info-row">
                <div className="info-label">Status</div>
                <div className="info-value">{seriesDetails.status}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Network</div>
                <div className="info-value">
                  {seriesDetails.networks && seriesDetails.networks[0]?.name}
                </div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Premiered</div>
                <div className="info-value">
                  {seriesDetails.first_air_date && 
                    new Date(seriesDetails.first_air_date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })
                  }
                </div>
              </div>
              
              {seriesDetails.status === 'Ended' && seriesDetails.last_air_date && (
                <div className="info-row">
                  <div className="info-label">Ended</div>
                  <div className="info-value">
                    {new Date(seriesDetails.last_air_date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              )}
              
              <div className="info-row">
                <div className="info-label">Seasons</div>
                <div className="info-value">{seriesDetails.number_of_seasons}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Episodes</div>
                <div className="info-value">{seriesDetails.number_of_episodes}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Rating</div>
                <div className="info-value">⭐ {seriesDetails.vote_average?.toFixed(1)}/10</div>
              </div>
              
              {seriesDetails.genres && seriesDetails.genres.length > 0 && (
                <div className="info-row">
                  <div className="info-label">Genres</div>
                  <div className="info-value">
                    {seriesDetails.genres.map(g => g.name).join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EpisodeList;
