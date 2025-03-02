// src/components/ImageDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ImageDetail() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const accessKey = import.meta.env.VITE_ACCESS_KEY;
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  useEffect(() => {
    const fetchImageDetail = async () => {
      try {
        const response = await axios.get(`/api/images/${id}`, {
          headers: {
            'X-Access-Key': accessKey,
            'X-Secret-Key': secretKey,
          },
        });
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };

    fetchImageDetail();
  }, [id, accessKey, secretKey]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-image-section">
        <img src={image.imageUrl} alt={image.description} className="detail-image" />
      </div>
      <div className="detail-info-section">
        <h2>{image.uploaderName} ({image.uploaderUsername})</h2>
        <p><strong>Upload Date:</strong> {new Date(image.uploadDate).toLocaleString()}</p>
        <p><strong>Description:</strong> {image.description}</p>
        <p><strong>Dimensions:</strong> {image.width} x {image.height}</p>
        <button className="download-btn">Download</button>
        <Link className="back-link" to="/">Back to Gallery</Link>
      </div>
    </div>
  );
}

export default ImageDetail;
