import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page) => {
    return await axios.get(API_URL + `/character/?page=${page}`);
}

export const getCharacterById = async (id) => {
    return await axios.get(API_URL + `/character/${id}`);
}

export const getEpisodeInfo = async (id) => {
    return await axios.get(API_URL + `/episode/${id}`)
}