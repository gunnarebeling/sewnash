const _apiUrl = "/api/sewclass";

export const getAllClasses = () => {
    return fetch(_apiUrl).then(res => res.json())
}