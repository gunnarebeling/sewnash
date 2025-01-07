const _apiUrl = "/api/photo";

export const uploadClassPhoto =  (file, classId) => {
    const formData = new FormData();
    formData.append("file", file);
    
    return fetch(`${_apiUrl}/upload?classId=${classId}`, {
        method: 'POST',
        
        body: formData
    })
        
}
export const getClassPhoto = (classId) => {
    return fetch(`${_apiUrl}/class/${classId}`).then(res => res.json())
}