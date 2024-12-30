const _apiUrl = "/api/sewclass";

export const getAllClasses = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const getClassById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}
export const postClass = (formData) => {
    return fetch(`${_apiUrl}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
}

export const deleteClass = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: 'DELETE'
    })
}

export const updateClass = (id, formData) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
}