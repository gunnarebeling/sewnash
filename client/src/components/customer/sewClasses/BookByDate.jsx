import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Col, Container, Row } from "reactstrap"
import { convertToDollars, formatDate } from "../../../managers/FormatFunctions"
import DatePicker from "react-datepicker"
import { getSessionByClassId } from "../../../managers/sessionManager"

export const BookByDate = () => {
    const [sessions, setSessions] = useState([])
    const [highlightDates, setHighlightDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectSessions, setSelectSessions] = useState([])
    const {classId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        
        getSessionByClassId(classId).then(setSessions)
    }, [classId])

    useEffect(() => {
        let dates = sessions.map(s => {
            if (s.open) {
                return new Date(s.dateTime)  // Convert session dateTime to Date object
                
            }
        })
        setHighlightDates(dates)  // Set the highlightDates to an array of Date objects
    }, [sessions])
    useEffect(() => {
        const dateSessions = sessions.filter(s => formatDate(s.dateTime) === formatDate(selectedDate))
        setSelectSessions(dateSessions)
    }, [selectedDate])

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