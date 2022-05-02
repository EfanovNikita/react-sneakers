import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://61d422528df81200178a8ac2.mockapi.io',
});