import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  const fetchPhotos = useCallback(async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
        params: {
          page: page,
          per_page: 20
        }
      });

      setPhotos(prev => [...prev, ...response.data]);
      setHasMore(response.data.length > 0);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, accessKey, hasMore, loading]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= 
      document.documentElement.offsetHeight && !loading) {
      fetchPhotos();
    }
  }, [loading, fetchPhotos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="gallery-container">
      <div className="images-grid">
        {photos.map((photo) => (
          <Link to={`/images/${photo.id}`} key={photo.id} className="image-card">
            <img 
              src={photo.urls.small} 
              alt={photo.alt_description || 'Unsplash Photo'} 
              loading="lazy"
            />
            <div className="card-info">
              <p>{photo.description || photo.alt_description || 'No description'}</p>
              <p>{new Date(photo.created_at).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
      {loading && <div className="loading-indicator">Loading more photos...</div>}
    </div>
  );
}

export default Gallery;