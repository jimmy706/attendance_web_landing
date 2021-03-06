import { API_URLS } from '../config/namespaces';
import axios from 'axios';
import { withAuthorization } from '../helpers/string-handle';

export function listMeetingsAPI(token) {
    return axios.get(`${API_URLS}attendances/list/`, withAuthorization(token))
}