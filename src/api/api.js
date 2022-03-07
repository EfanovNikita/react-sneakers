import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://61d422528df81200178a8ac2.mockapi.io',
});

export function API(method='get', path='', data={}) {
    return instance({
        url: path,
        method,
        data
    })
}