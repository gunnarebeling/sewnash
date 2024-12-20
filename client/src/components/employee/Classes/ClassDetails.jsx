import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Button, Container, Table } from "reactstrap"
import { convertToDollars } from "../../../managers/FormatFunctions"

export const ClassDetails = () => {
    const [sewClass, setSewClass] = useState({})
    const {classId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
           getClassById(classId).then(setSewClass)
       }, [classId])
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
            <Button color="primary" onClick={() => {
                navigate('availability')
            }}> Availability Calendar</Button>
        </Container>

    )
}