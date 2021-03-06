import { API_URLS } from '../config/namespaces';
import axios from 'axios';
import { withAuthorization } from '../helpers/string-handle';

export function loginAPI(username, password) {
    return axios.post(`${API_URLS}api/token/`, { username, password })
}

export function refreshTokenAPI(refreshToken) {
    return axios.post(`${API_URLS}api/token/refresh/`, { refresh: refreshToken })
}

export function createAccountAPI(user) {
    return axios.post(`${API_URLS}attendances/create-account/`, user);
}

export function getMyProfileAPI(token) {
    return axios.get(`${API_URLS}attendances/profile/`, withAuthorization(token))
}