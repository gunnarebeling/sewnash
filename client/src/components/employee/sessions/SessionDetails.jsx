import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Container,  Table } from "reactstrap"
import { getSessionById } from "../../../managers/sessionManager"
import { convertToDollars, formatAmericanDate } from "../../../managers/FormatFunctions"
import { deleteBooking } from "../../../managers/bookingManager"
import { UpdateBooking } from "./UpdateBooking"

export const SessionDetails = () => {
    const {sessionId} = useParams()
    const [modal, setModal] = useState(false);
    const [session , setSession] = useState({})

    useEffect(() => {
       getSessionById(sessionId).then(setSession) 
    }, [sessionId, modal])

    const handleDeleteBooking = (e) => {
        const id = e.target.dataset.id
        deleteBooking(id).then(() => getSessionById(sessionId).then(setSession))
    }

    return (
        <Container>
            <header className="mt-2">
                <h4>
                    {session.sewClass?.name}
                </h4>
                <h5>{`${formatAmericanDate(session.dateTime)} ${session.time?.startTime}`}</h5>
            </header>
            <Table>
                <tbody>
                    <tr>
                        <th>Total People</th>
                        <td>{session.totalPeople}</td>
                    </tr>
                    <tr>
                        <th>Total Amount Accrued</th>
                        <td>{convertToDollars(session.totalAmount)}</td>
                    </tr>
                    
                </tbody>
            </Table>
            <h5>Bookings</h5>
            <Table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>Phone Number</th>
                        <th>Occupancy</th>
                        <th>Date Booked</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {session.bookings?.map(b => {
                        return(
                            <tr key={b.id}>
                                <th>{b.name}</th>
                                <td>{b.phoneNumber}</td>
                                <td>{b.occupancy}</td>
                                <td>{formatAmericanDate(b.dateBooked)}</td>
                                <td><Button data-id={b.id} onClick={handleDeleteBooking} color="danger">Delete</Button></td>
                                <td><UpdateBooking booking={b} modal={modal} setModal={setModal} /></td>
                            </tr>
                        )

                    })}
                    
                </tbody>
            </Table>
            
        </Container>
    )
}