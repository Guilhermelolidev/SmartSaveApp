import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_URL;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_URL is not set');
}

export const api = axios.create({
  baseURL: `${baseUrl}/api`,
});
