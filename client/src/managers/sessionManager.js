const _apiUrl = "/api/session";

export const getSessionByClassId = (classId) => {
    return fetch(`${_apiUrl}/${classId}`).then(res => res.json())
}