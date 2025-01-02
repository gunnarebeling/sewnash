const _apiUrl = "/api/session";

export const getSessionByClassId = (classId) => {
    return fetch(`${_apiUrl}/class/${classId}`).then(res => res.json())
}
export const getSessionById = (sessionId) => {
    return fetch(`${_apiUrl}/${sessionId}`).then(res => res.json())
}
export const getAllSessions = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const deleteSession = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: 'DELETE'
    })
}

export const lockUnlockSession = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: 'PUT'
    })
}

export const getSessionsByDate = (date) => {
    if (!(date instanceof Date)) {
        date = new Date(date); // Convert to Date object
    }
    date = date.toISOString().split('T')[0]
    return fetch(`${_apiUrl}/date?date=${date}`).then(res => res.json())
}
