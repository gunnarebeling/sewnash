import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Button, Container, Input, Label, Table } from "reactstrap"
import { convertToDollars } from "../../../managers/FormatFunctions"
import { uploadClassPhoto } from "../../../managers/photoManager"
import './ClassDetails.css'

export const ClassDetails = () => {
    const [sewClass, setSewClass] = useState({})
    const [photo, setPhoto] = useState(null)
    const [photoURL, setPhotoURL] = useState(null);
    const {classId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
           getClassById(classId).then(setSewClass)
       }, [classId])
    const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoURL(URL.createObjectURL(file));
    };
    return (
        <Container>
            <header className="text-center m-4">
                <h4>
                    {sewClass.name}
                </h4>
            </header>
            <Table>
                <tbody>
                    <tr>
                        <th>Max People</th>
                        <td>{sewClass.maxPeople}</td>
                    </tr>
                    <tr>
                        <th>Duration</th>
                        <td>{`${sewClass.duration} hours`}</td>
                    </tr>
                    <tr>
                        <th>price per person</th>
                        <td>{`${convertToDollars(sewClass.pricePerPerson)}`}</td>
                    </tr>
                    
                </tbody>
            </Table>
            <div>

                <Button color="primary" onClick={() => {
                    navigate('availability')
                }}> Availability Calendar</Button>
                <Button  onClick={() => {
                    navigate('photos')
                }}>Photos</Button>
            </div>
            <div className="mt-4">

            <Label>upload photo</Label>
            <div className=" d-flex">

            <Input
                aria-label="upload photo"
                type="file"
                name="image"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-50  "
            />
            <Button  className="mx-3" onClick={() => {
                uploadClassPhoto(photo, classId).then(() => {
                    alert("photo uploaded")
                    setPhoto(null)
                    setPhotoURL(null)
                })
            }}>Submit</Button>
            </div>
            </div>
            {photo &&
                <div className="image-container mt-4">
                    <img src={photoURL} alt="selected photo" className="img-fluid custom-img fixed-size"/>
                </div>
            }
        </Container>

    )
}