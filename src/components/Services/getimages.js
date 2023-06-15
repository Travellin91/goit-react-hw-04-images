import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35806799-4c2a0f1dc5f5db1917aa24325';

export function getImages(searchQuery, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });

  return axios
    .get(`${BASE_URL}?${params.toString()}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error.toJSON());
      throw error;
    });
}
