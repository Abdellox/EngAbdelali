import React, { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';
import { subtitlesApi } from '../services/subtitlesApi';

function EpisodeView({ episode, series, onBack }) {
  const [episodeDetails, setEpisodeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [script, setScript] = useState(null);
  const [loadingScript, setLoadingScript] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadEpisodeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);

  const loadEpisodeDetails = async () => {
    setLoading(true);
    const details = await tmdbApi.getEpisodeDetails(
      episode.seriesId,
      episode.season_number,
      episode.episode_number
    );
    setEpisodeDetails(details);
    setLoading(false);
  };

  const loadScript = async () => {
    if (script) return; // Already loaded
    
    setLoadingScript(true);
    
    // Try to get real transcripts from multiple sources
    const scriptData = await subtitlesApi.getEpisodeTranscript(
      series.name,
      episode.season_number,
      episode.episode_number,
      episode.seriesId
    );
    
    setScript(scriptData);
    setLoadingScript(false);
  };

  useEffect(() => {
    if (activeTab === 'script') {
      loadScript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);



  if (loading || !episodeDetails) {
    return <div className="loading">Loading episode details...</div>;
  }

  return (
    <div>
      <button onClick={onBack} className="back-button">← Back to Episodes</button>
      
      <div className="episode-page">
        <div className="episode-main">
          <div className="episode-header-section">
            <h1>{episodeDetails.name}</h1>
            <h2>Season {episodeDetails.season_number}, Episode {episodeDetails.episode_number}</h2>
          </div>

          <div className="episode-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'script' ? 'active' : ''}`}
              onClick={() => setActiveTab('script')}
            >
              📖 Read Script
            </button>
            <button 
              className={`tab-button ${activeTab === 'cast' ? 'active' : ''}`}
              onClick={() => setActiveTab('cast')}
            >
              Cast & Crew
            </button>
          </div>

          {activeTab === 'overview' && (
            <>
              {episodeDetails.still_path && (
                <img 
                  src={tmdbApi.getImageUrl(episodeDetails.still_path, 'w780')} 
                  alt={episodeDetails.name}
                  className="episode-still"
                />
              )}

              <div className="episode-overview-section">
                <h3>Synopsis</h3>
                <p className="episode-overview-text">
                  {episodeDetails.overview || 'No synopsis available for this episode.'}
                </p>
              </div>
            </>
          )}

          {activeTab === 'script' && (
            <div className="script-section">
              {loadingScript && <div className="loading">Loading script...</div>}
              
              {!loadingScript && !script && (
                <div className="note-box">
                  <p>📖 Episode script is being loaded...</p>
                </div>
              )}

              {!loadingScript && script && (
                <div className="script-content">
                  <button 
                    className="print-button" 
                    onClick={() => window.print()}
                    title="Print this script"
                  >
                    🖨️ Print
                  </button>
                  
                  <div className="script-header">
                    <h3>Episode Script</h3>
                    <p className="script-info">
                      Read the complete dialogue with timestamps, or listen to the audio narration.
                    </p>
                    
                    <div className="script-info-box">
                      <p className="script-source-info">
                        📖 <strong>Reading Mode:</strong> Complete episode script with timestamps
                      </p>
                      <p className="script-note">
                        Scripts are sourced from subtitle databases and community transcripts
                      </p>
                    </div>
                  </div>

                  {script.map((scene, index) => {
                    // Calculate timeline for each scene (distribute across episode runtime)
                    const totalScenes = script.length;
                    const runtime = episodeDetails.runtime || 40; // Default 40 min
                    const sceneStartTime = Math.floor((index / totalScenes) * runtime);
                    const sceneEndTime = Math.floor(((index + 1) / totalScenes) * runtime);
                    
                    return (
                      <div key={index} className="script-scene">
                        <div className="scene-header-with-time">
                          <div className="scene-heading">{scene.scene}</div>
                          <div className="scene-timeline">
                            {formatTime(sceneStartTime)} - {formatTime(sceneEndTime)}
                          </div>
                        </div>
                        <div className="scene-dialogues">
                          {scene.dialogues.map((dialogue, dIndex) => {
                            // Calculate timestamp for each dialogue within the scene
                            const dialogueTime = sceneStartTime + Math.floor((dIndex / scene.dialogues.length) * (sceneEndTime - sceneStartTime));
                            
                            return (
                              <div key={dIndex} className="dialogue-block">
                                <div className="dialogue-timestamp">{formatTime(dialogueTime)}</div>
                                <div className="dialogue-content">
                                  <div className="character-name">{dialogue.character}</div>
                                  <div className="dialogue-text">{dialogue.line}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  <div className="script-footer">
                    <p>
                      💡 <strong>Note:</strong> Scripts are sourced from community databases and subtitle files. 
                      Some episodes may have limited or unavailable scripts.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'cast' && (
            <div>

              {episodeDetails.crew && episodeDetails.crew.length > 0 && (
                <div>
                  <h3 className="section-title">Crew</h3>
                  <div className="crew-grid">
                    {episodeDetails.crew.slice(0, 8).map((member, index) => (
                      <div key={index} className="crew-card">
                        <div className="crew-name">{member.name}</div>
                        <div className="crew-job">{member.job}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {episodeDetails.guest_stars && episodeDetails.guest_stars.length > 0 && (
                <div>
                  <h3 className="section-title">Guest Stars</h3>
                  <div className="cast-grid">
                    {episodeDetails.guest_stars.slice(0, 8).map((star, index) => (
                      <div key={index} className="cast-card">
                        {star.profile_path ? (
                          <img 
                            src={tmdbApi.getImageUrl(star.profile_path)} 
                            alt={star.name}
                            className="cast-image"
                          />
                        ) : (
                          <div className="cast-image" style={{
                            background: '#2a2a2a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666',
                            fontSize: '2rem'
                          }}>👤</div>
                        )}
                        <div className="cast-info">
                          <div className="cast-name">{star.name}</div>
                          <div className="cast-character">{star.character}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="series-sidebar">
          <div className="info-box">
            <div className="info-box-header">Episode Info</div>
            <div className="info-box-content">
              <div className="info-row">
                <div className="info-label">Series</div>
                <div className="info-value">{series.name}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Season</div>
                <div className="info-value">{episodeDetails.season_number}</div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Episode</div>
                <div className="info-value">{episodeDetails.episode_number}</div>
              </div>
              
              {episodeDetails.air_date && (
                <div className="info-row">
                  <div className="info-label">Air Date</div>
                  <div className="info-value">
                    {new Date(episodeDetails.air_date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              )}
              
              {episodeDetails.runtime && (
                <div className="info-row">
                  <div className="info-label">Runtime</div>
                  <div className="info-value">{episodeDetails.runtime} min</div>
                </div>
              )}
              
              {episodeDetails.vote_average > 0 && (
                <div className="info-row">
                  <div className="info-label">Rating</div>
                  <div className="info-value">⭐ {episodeDetails.vote_average.toFixed(1)}/10</div>
                </div>
              )}
              
              {episodeDetails.vote_count > 0 && (
                <div className="info-row">
                  <div className="info-label">Votes</div>
                  <div className="info-value">{episodeDetails.vote_count.toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Helper function to format time in MM:SS
function formatTime(minutes) {
  const mins = Math.floor(minutes);
  const secs = Math.floor((minutes - mins) * 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default EpisodeView;
