const _apiUrl = "/api/booking";

export const PostBooking = (booking) => {
    return fetch(_apiUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
    })
}