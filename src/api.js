import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.unsplash.com',
  params: {
    client_id: import.meta.env.VITE_ACCESS_KEY,
  },
});

export const fetchPhotos = (page = 1, per_page = 10) => {
  return API.get('/photos', {
    params: { page, per_page },
  });
};
