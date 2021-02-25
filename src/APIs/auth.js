import { API_URLS } from '../config/namespaces';
import axios from 'axios';

export function loginAPI(username, password) {
    return axios.post(`${API_URLS}api/token/`, { username, password })
}

export function refreshTokenAPI(refreshToken) {
    return axios.post(`${API_URLS}api/token/refresh/`, { refresh: refreshToken })
}