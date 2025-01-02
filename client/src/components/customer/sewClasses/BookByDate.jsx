import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Card, Col, Container, Row } from "reactstrap"
import { convertToDollars, formatDate } from "../../../managers/FormatFunctions"
import DatePicker from "react-datepicker"
import { getAllSessions, getSessionByClassId, getSessionsByDate } from "../../../managers/sessionManager"
import "./BookByDate.css"

export const BookByDate = () => {
    const [allSessions, setAllSessions] = useState([])
    const [highlightDates, setHighlightDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredSessions, setFilteredSessions] = useState([])
    const [filteredClasses, setFilteredClasses] = useState([])
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

    useEffect(() => {
        let classes = filteredSessions.reduce((classes,sesh) =>{
            if (!classes.some(c => c.id === sesh.sewClass.id)) {
                classes.push(sesh.sewClass)
            }
            return classes
        }, [])
        setFilteredClasses(classes)
    }, [filteredSessions])

    const handleSessionClick = (e) => {
        const sessionId = e.target.dataset.id
        navigate(`/booking/${sessionId}`)
    }
    const handleArrows = (e) => {
        const direction = e.target.id
        let newDate = new Date(selectedDate)
        if (direction === "date-prev") {
            newDate.setDate(selectedDate.getDate() - 1)
        }else{
            newDate.setDate(selectedDate.getDate() + 1)
        }
        setSelectedDate(newDate)
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
                <Col  className=" border-start  p-0">
                    <nav className="border-bottom position-relative">
                        
                        <h5 className="text-center p-2 ">{selectedDate.toDateString()}</h5>
                        <a id="date-prev" onClick={handleArrows} className=" border-end search-by-date-arrows d-flex align-items-center justify-content-center position-absolute top-0 bottom-0 start-0">
                            {"<"}
                        </a>
                        <a id="date-next" onClick={handleArrows}  className=" search-by-date-arrows border-start d-flex align-items-center justify-content-center position-absolute top-0 bottom-0 end-0">
                        {">"}
                        </a>
                        
                    </nav>
                    {filteredClasses.map(c => {
                        return (
                            <article key={c.id} className="p-2 border-bottom">
                                <h4>{c.name}</h4>
                                <div className="pb-1">
                                    <span >{`${c.duration} Hours`}</span>
                                </div>
                                <div>
                                    <span className="price-box p-1"><span>{convertToDollars(c.pricePerPerson)}</span></span>
                                </div>
                                <div className="d-flex">
                                    {filteredSessions.filter(s => s.sewClassId === c.id).map(s => {
                                        return(
                                            <span key={s.id} data-id={s.id} onClick={handleSessionClick} className="border border-2 bg-white p-1 my-3 rounded clickable-div">{`${s.time?.startTime} ${'>'}`}</span>
                                        )
                                    })}
                                </div>
                                <div className="py-3 px-2 image-container">
                                <img src={`https://static.wixstatic.com/media/cc057e_078e2d80a13a44cba226ea4549b9a745~mv2.png/v1/fill/w_250,h_250,al_c,q_95,enc_auto/cc057e_078e2d80a13a44cba226ea4549b9a745~mv2.png`} alt={`album art`} className="img-fluid custom-img fixed-size "/>
                                </div>

                               
                            </article>
                        )
                    })}
                    

                </Col>

            </Row>
        </Container>
    )
}