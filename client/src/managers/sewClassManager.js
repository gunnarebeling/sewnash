const _apiUrl = "/api/sewclass";

export const getAllClasses = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const getClassById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}