import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_REST_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (path, method = 'GET', body) => {
  try {
    const response = await api({ method, url: path, data: body });
    return response.data;
  } catch (error) {
    throw new Error(`Error en la solicitud al endpoint: ${error.message}`);
  }
};
