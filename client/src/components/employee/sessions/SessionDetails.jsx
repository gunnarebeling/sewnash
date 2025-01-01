import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container,  Table } from "reactstrap"
import { deleteSession, getSessionById, lockUnlockSession } from "../../../managers/sessionManager"
import { convertToDollars, formatAmericanDate } from "../../../managers/FormatFunctions"
import { deleteBooking } from "../../../managers/bookingManager"
import { UpdateBooking } from "./UpdateBooking"

export const SessionDetails = () => {
    const {sessionId} = useParams()
    const [modal, setModal] = useState(false);
    const [session , setSession] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
       getSessionById(sessionId).then(setSession) 
    }, [sessionId, modal])

    const handleDeleteBooking = (e) => {
        const id = e.target.dataset.id
        deleteBooking(id).then(() => getSessionById(sessionId).then(setSession))
    }
    const handleDeleteSession = (e) => {
        e.preventDefault()
        deleteSession(sessionId).then(() => {
            
            navigate(`/employee/classes/${session.sewClassId}/availability`)
           
        })
    }
    const handleLock = (e) => {
        e.preventDefault()
        lockUnlockSession(sessionId).then(() => getSessionById(sessionId).then(setSession))
    }

    return (
        <Container>
            <header className="mt-2">
                <div className="d-flex">
                    <h4>
                        {session.sewClass?.name}
                    </h4>
                    {session.bookings?.length === 0 && 
                        <Button 
                            color="danger" 
                            className="mx-3" 
                            onClick={handleDeleteSession} 
                        >Delete
                        </Button>}
                    {session.totalPeople <= session.sewClass?.maxPeople && 
                        <Button color="warning" onClick={handleLock}>{session.open ? "lock" : "unlock"}</Button>
                    }
                </div>
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
                    <tr>
                        <th>Locked/Unlocked</th>
                        <td>{session.open ? "lock" : "unlock"}</td>
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