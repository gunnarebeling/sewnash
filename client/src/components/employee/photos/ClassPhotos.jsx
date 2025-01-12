import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { deletePhoto, getClassPhoto, setMainPhoto } from "../../../managers/photoManager";
import './ClassPhotos.css'
import { Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";

export const ClassPhotos = () => {
    const { classId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(null);

    const togglePopover = (id) => {
        setPopoverOpen(popoverOpen === id ? null : id);
    };

    const handleDelete = (e) => {
        const id = e.target.dataset.id
        deletePhoto(id).then(() => {
            getClassPhoto(classId).then(setPhotos)
        })
    }
    const handleSetMain = (e) => {
        const id = e.target.dataset.id
        setMainPhoto(classId, id).then(() => {
            togglePopover(id)
            
        })
    }

    useEffect(() => {
        // fetch photos by classId
        getClassPhoto(classId).then(setPhotos)
    },[classId])

    return (
        <div className="text-center">
                <h1>Class Photos</h1>
            <div className="d-flex flex-wrap ">
                {photos.map(photo => (
                    <div key={photo.id} className="photo-container ">
                    <img
                        src={photo.fileKey}
                        alt={`class picture ${photo.id}`}
                        className="custom-img border border-3 rounded"
                        id={`photo-${photo.id}`}
                        onClick={() => togglePopover(photo.id)}
                    />
                    <Popover
                        placement="auto"
                        isOpen={popoverOpen === photo.id}
                        target={`photo-${photo.id}`}
                        toggle={() => togglePopover(photo.id)}
                    >
                        <PopoverHeader>Photo update</PopoverHeader>
                        <PopoverBody >
                            
                            <Button  data-id={photo.id} onClick={handleDelete} color="danger" size="sm" className="me-2">Delete</Button>
                            <Button color="warning" size="sm" data-id={photo.id} onClick={handleSetMain}>set as Main</Button>
                        </PopoverBody>
                    </Popover>
                </div>
                ))}
            </div>
        </div>
    )

}