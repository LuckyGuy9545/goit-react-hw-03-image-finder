import axios from 'axios';

export default async function galleryFetch(searchQuery, page) {
  const url = 'https://pixabay.com/api/';
  const key = '32854476-805ee57f77a30afa60c0542ae';
  const filter = `?q=${searchQuery}&page=${page}&key=${key}&image_type=photo
&orientation=horizontal&safesearch=true&per_page=12`;
  const response = await axios.get(`${url}${filter}`);
  // console.log('response.data', response.data);
  return response.data;
}
