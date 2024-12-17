import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Col, Container, Row } from "reactstrap"
import { convertToDollars, normalizeDate } from "../../../managers/FormatFunctions"
import DatePicker from "react-datepicker"
import { getSessionByClassId } from "../../../managers/sessionManager"

export const BookByClass = () => {
    const [sewClass, setSewClass] = useState({})
    const [sessions, setSessions] = useState([])
    const [highlightDates, setHighlightDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const {classId} = useParams()

    useEffect(() => {
        getClassById(classId).then(setSewClass)
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

    return (
        <Container fluid>
            <Row>
                <Col md="6" sm="6" className=" text-center">
                    <div id='detail-header' className="m-5">
                        <h2>{sewClass.name}</h2>
                        <p></p>
                    </div>
                        <p>location - berry hill  &#8226; {sewClass.duration} hours long</p>
                    <div>
                        <img src="https://static.wixstatic.com/media/cc057e_078e2d80a13a44cba226ea4549b9a745~mv2.png/v1/fill/w_250,h_250,al_c,q_95,enc_auto/cc057e_078e2d80a13a44cba226ea4549b9a745~mv2.png" alt="class picture" />
                    </div>
                    <div>
                        <h4>Price</h4>
                        <p>{convertToDollars(sewClass.pricePerPerson)}</p>
                    </div>
                    <div>
                        <h4>Description</h4>
                        <p>{sewClass.description}</p>
                    </div>

                </Col>

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
            </Row>
        </Container>
    )
}