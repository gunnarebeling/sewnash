 const _apiUrl = "/api/stripe";
export const getStripeForm = (itemObj) => {
    return fetch(`${_apiUrl}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemObj)
    }).then(res => res.json())
}

export const UpdateStripeForm = (itemObj) => {
    return fetch(`${_apiUrl}/update-payment-intent`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemObj)
    }).then(res => res.json())
}