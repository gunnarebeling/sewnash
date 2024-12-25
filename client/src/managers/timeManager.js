const _apiUrl = "/api/time";

export const getAllTimes = () => {
    return fetch(_apiUrl).then(res => res.json())
}