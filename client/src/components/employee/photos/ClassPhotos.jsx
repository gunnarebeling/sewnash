import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getClassPhoto } from "../../../managers/photoManager";
import './ClassPhotos.css'

export const ClassPhotos = () => {
    const { classId } = useParams();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // fetch photos by classId
        getClassPhoto(classId).then(setPhotos)
    },[classId])

    return (
        <div>
            <h1>Class Photos</h1>
            <div className="d-flex flex-wrap ">
                {photos.map(photo => (
                    <img key={photo.id} src={photo.fileKey} alt="class" className=" custom-img  m-2"/>
                ))}
            </div>
        </div>
    )

}