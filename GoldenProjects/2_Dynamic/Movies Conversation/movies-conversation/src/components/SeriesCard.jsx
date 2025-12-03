import React from 'react';
import { tmdbApi } from '../services/tmdbApi';

function SeriesCard({ series, onSelect }) {
  const imageUrl = tmdbApi.getImageUrl(series.poster_path);
  const year = series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A';
  
  return (
    <div className="series-card" onClick={() => onSelect(series)}>
      <img src={imageUrl} alt={series.name} className="series-image" />
      <div className="series-info">
        <h3>{series.name}</h3>
        <p className="genre">⭐ {series.vote_average?.toFixed(1)} | {year}</p>
        <p className="description">{series.overview || 'No description available'}</p>
      </div>
    </div>
  );
}

export default SeriesCard;
