 const _apiUrl = "/api/stripe";
export const getStripeForm = (classId) => {
    return fetch(`${_apiUrl}/create-checkout-session/${classId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}