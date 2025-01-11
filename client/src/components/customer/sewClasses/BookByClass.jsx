import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Col, Container, Row } from "reactstrap"
import { convertToDollars, formatDate } from "../../../managers/FormatFunctions"
import DatePicker from "react-datepicker"
import { getSessionByClassId } from "../../../managers/sessionManager"
import { getClassPhoto } from "../../../managers/photoManager"
import './BookByClass.css'

export const BookByClass = () => {
    const [sewClass, setSewClass] = useState({})
    const [sessions, setSessions] = useState([])
    const [highlightDates, setHighlightDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectSessions, setSelectSessions] = useState([])
    const [Photos, setPhotos] = useState([])
    const {classId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getClassById(classId).then(setSewClass)
        getSessionByClassId(classId).then(setSessions)
        getClassPhoto(classId).then((photos) => {
            setPhotos(photos.map(p => p.fileKey))
        })
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
                <Col  className=" text-center">
                    <div id='detail-header' className="m-5">
                        <h2>{sewClass.name}</h2>
                        <p></p>
                    </div>
                        <p>location - berry hill  &#8226; {sewClass.duration} hours long</p>
                    <div>
                        <img src={Photos[0]} alt="class picture" className="custom-img" />
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
                <div className="m-4 d-flex justify-content-center flex-wrap gap-4">
                    {selectSessions.filter(s => s.open).map(s => {
                        return(
                        <div key={s.id}  >
                            <span data-id={s.id} onClick={handleSessionClick} className="border border-2 bg-white p-2  rounded clickable-div text-nowrap">{`${sewClass.name} ${s.time?.startTime} ${'>'}`}</span>
                            
                        </div>
                        )

                    })}

                </div>
                </Col>
            </Row>
        </Container>
    )
}