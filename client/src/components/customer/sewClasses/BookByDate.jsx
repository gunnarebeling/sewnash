import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Col, Container, Row } from "reactstrap"
import { convertToDollars, formatDate } from "../../../managers/FormatFunctions"
import DatePicker from "react-datepicker"
import { getAllSessions, getSessionByClassId, getSessionsByDate } from "../../../managers/sessionManager"

export const BookByDate = () => {
    const [allSessions, setAllSessions] = useState([])
    const [highlightDates, setHighlightDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredSessions, setFilteredSessions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        
        getAllSessions().then((res) => {
            let sessions = []
            res.forEach(s => {
                if (s.open) {
                    sessions.push(s)
                }
            })
            setAllSessions(sessions)
            
        })
    }, [])

    useEffect(() => {
        
        let dates = allSessions.map(s => {
            return new Date(s.dateTime)
        })
         
        setHighlightDates(dates)  // Set the highlightDates to an array of Date objects
    }, [allSessions])
    useEffect(() => {
        const dateSessions = allSessions.filter(s => {
            const sessionDate = new Date(s.dateTime);
            return (
                sessionDate.getFullYear() === selectedDate.getFullYear() &&
                sessionDate.getMonth() === selectedDate.getMonth() &&
                sessionDate.getDate() === selectedDate.getDate()
            );
        });
        setFilteredSessions(dateSessions);
    }, [selectedDate, allSessions]);

    const handleSessionClick = (e) => {
        const sessionId = e.target.dataset.id
        navigate(`/booking/${sessionId}`)
    }
    

    return (
        <Container fluid>
            <Row>
                <Col className=" border-start ">
                <div className="m-4 d-flex justify-content-center">

                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        highlightDates={highlightDates}
                        inline

                    />
                </div>
                </Col>
                <Col  className=" text-center">
                    

                </Col>

            </Row>
        </Container>
    )
}