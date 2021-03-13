import { API_URLS } from '../config/namespaces';
import axios from 'axios';
import { withAuthorization } from '../helpers/string-handle';

export function listMeetingsAPI(token) {
    return axios.get(`${API_URLS}attendances/list/`, withAuthorization(token))
}

export function leaveMeeting(token, meetingId) {
    return axios.post(`${API_URLS}attendances/leave-attendance/${meetingId}/`, {}, withAuthorization(token));
}

export function joinMeeting(token, meetingId) {
    return axios.post(`${API_URLS}attendances/attendance-register/${meetingId}/`, {}, withAuthorization(token));
}

export function createNewMeeting(token, body) {
    return axios.post(`${API_URLS}attendances/create-attendance/`, body, withAuthorization(token));
}

export function getMeetingDetail(token, meetingId) {
    return axios.get(`${API_URLS}attendances/${meetingId}/`, withAuthorization(token));
}