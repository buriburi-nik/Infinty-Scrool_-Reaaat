import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [accessKey]);

  return (
    <div className="gallery-container">
      <h1>Unsplash Photos</h1>
      <div className="images-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="image-card">
            <img src={photo.urls.small} alt={photo.alt_description || 'Unsplash Photo'} />
            <div className="card-info">
              <p>{photo.description || photo.alt_description || 'No description'}</p>
              <p>{new Date(photo.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
