const _apiUrl = "/api/availability";

export const postAvailability = (availability) => {
    return fetch(_apiUrl, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(availability)
    })
}