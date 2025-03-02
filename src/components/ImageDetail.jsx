import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ImageDetail() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    const fetchImageDetail = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };

    fetchImageDetail();
  }, [id, accessKey]);

  if (!image) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-image-section">
        <img 
          src={image.urls.regular} 
          alt={image.alt_description || image.description} 
          className="detail-image"
          loading="eager"
        />
      </div>
      <div className="detail-info-section">
        <div className="author-info">
          <img 
            src={image.user.profile_image.medium} 
            alt={image.user.name} 
            className="author-avatar"
          />
          <div>
            <h2>{image.user.name}</h2>
            <a 
              href={`https://unsplash.com/@${image.user.username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="username-link"
            >
              @{image.user.username}
            </a>
          </div>
        </div>
        
        <div className="meta-info">
          <p><strong>Uploaded:</strong> {new Date(image.created_at).toLocaleDateString()}</p>
          <p><strong>Dimensions:</strong> {image.width}px × {image.height}px</p>
          <p><strong>Downloads:</strong> {image.downloads.toLocaleString()}</p>
        </div>

        <p className="image-description">
          {image.description || image.alt_description || 'No description available'}
        </p>

        <div className="action-buttons">
          <a 
            href={image.links.download} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="download-btn"
          >
            Download Free
          </a>
          <Link to="/" className="back-link">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ImageDetail;