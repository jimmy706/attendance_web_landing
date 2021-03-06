import { API_URLS } from '../config/namespaces';
import axios from 'axios';
import { getQueryStringFromObject, withAuthorization } from '../helpers/string-handle';

export function listMeetingsAPI(token, page = 1, size = 10) {
    return axios.get(`${API_URLS}attendances/list/?${getQueryStringFromObject({ page, size })}`, withAuthorization(token))
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

export function getMeetingMembers(meetingId) {
    return axios.get(`${API_URLS}attendances/${meetingId}/members/`);
}

export function listMyMeetingsAPI(token) {
    return axios.get(`${API_URLS}attendances/my-attendances/`, withAuthorization(token));
}

export function listMyRegisteredMeeting(token) {
    return axios.get(`${API_URLS}attendances/my-registered-attendances/`, withAuthorization(token));
}

export function removeMemberFromMeeting(token, meetingId, user_id) {
    return axios.post(`${API_URLS}attendances/remove-member/${meetingId}/`, { user_id }, withAuthorization(token))
}

export function updateMeeting(token, meetingId, body) {
    return axios.put(`${API_URLS}attendances/update/${meetingId}/`, body, withAuthorization(token));
}

export function deleteMeeting(token, meetingId) {
    return axios.delete(`${API_URLS}attendances/delete/${meetingId}/`, withAuthorization(token));
}

export function searchMeeting(search) {
    return axios.get(`${API_URLS}attendances/search-attendances/?search=${search}`)
}

export function getProfile(user_id) {
    return axios.get(`${API_URLS}attendances/user/${user_id}/`);
}