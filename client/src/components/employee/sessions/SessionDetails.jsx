import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import { deleteSession, getSessionById, lockUnlockSession } from "../../../managers/sessionManager";
import { convertToDollars, formatAmericanDate } from "../../../managers/FormatFunctions";
import { deleteBooking } from "../../../managers/bookingManager";

import './SessionDetail.css'
import { UpdateBooking } from "../bookings/UpdateBooking";

export const SessionDetails = () => {
    const { sessionId } = useParams();
    const [modal, setModal] = useState(false);
    const [session, setSession] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getSessionById(sessionId).then(setSession);
    }, [sessionId, modal]);

    const handleDeleteBooking = (e) => {
        const id = e.target.dataset.id;
        deleteBooking(id).then(() => getSessionById(sessionId).then(setSession));
    };

    const handleDeleteSession = (e) => {
        e.preventDefault();
        deleteSession(sessionId).then(() => {
            navigate(`/employee/classes/${session.sewClassId}/availability`);
        });
    };

    const handleLock = (e) => {
        e.preventDefault();
        lockUnlockSession(sessionId).then(() => getSessionById(sessionId).then(setSession));
    };

    return (
        <Container className="border border-3 bg-light px-3 rounded bg-opacity-50 p-2 mt-4">
            <header className="mt-2">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                    <h4 className="flex-grow-1">
                        {session.sewClass?.name}
                    </h4>
                    <div className="d-flex  ">
                        {session.bookings?.length === 0 && 
                            <Button 
                                color="danger" 
                                className="me-2 my-2 my-md-0 " 
                                onClick={handleDeleteSession} 
                            >Delete
                            </Button>}
                        {session.totalPeople <= session.sewClass?.maxPeople && 
                            <Button color="warning" className="my-2 my-md-0" onClick={handleLock}>
                                {session.open ? "Lock" : "Unlock"}
                            </Button>
                        }

                    </div>
                </div>
                <h5>{`${formatAmericanDate(session.dateTime)} ${session.time?.startTime}`}</h5>
            </header>
            <Table responsive className="table-sm">
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
                        <th>Open/Closed</th>
                        <td>{session.open ? "Open" : "Closed"}</td>
                    </tr>
                </tbody>
            </Table>
            <h5>Bookings</h5>
            <Table responsive className="table-sm bookings-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Occupancy</th>
                        <th>Date Booked</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {session.bookings?.map(b => (
                        <tr key={b.id}>
                            <th data-label="Name">{b.name}</th>
                            <td data-label="Phone Number">{b.phoneNumber}</td>
                            <td data-label="Occupancy">{b.occupancy}</td>
                            <td data-label="Date Booked">{formatAmericanDate(b.dateBooked)}</td>
                            <td colSpan="2">
                                <div className="button-container d-flex justify-content-between">
                                    <Button data-id={b.id} size="sm" onClick={handleDeleteBooking} color="danger">Delete</Button>
                                    <UpdateBooking booking={b} modal={modal} setModal={setModal} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default SessionDetails;