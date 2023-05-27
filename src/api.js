import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (name, status, gender) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character`, {
      params: {
        name,
        status,
        gender,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

export const getCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
};
