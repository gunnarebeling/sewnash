import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClassById } from "../../../managers/sewClassManager"
import { Col, Container, Row } from "reactstrap"
import { convertToDollars, formatDate } from "../../../managers/FormatFunctions"
import DatePicker from "react-datepicker"
import Slider from "react-slick";
import { getSessionByClassId } from "../../../managers/sessionManager"
import { getClassPhoto } from "../../../managers/photoManager"

import './BookByClass.css'

export const BookByClass = () => {
    const [sewClass, setSewClass] = useState({})
    const [sessions, setSessions] = useState([])
    const [highlightDates, setHighlightDates] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectSessions, setSelectSessions] = useState([])
    const [allPhotos, setAllPhotos] = useState([])
    const [mainPhoto, setMainPhoto] = useState('')
    const [filteredPhotos, setFilteredPhotos] = useState([])
    const [photoSettings, setPhotoSettings] = useState({})


    const {classId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getClassById(classId).then(setSewClass)
        getSessionByClassId(classId).then(setSessions)
        getClassPhoto(classId).then((photos) => {
            setAllPhotos(photos)
            
        })
    }, [classId])

    useEffect(() => {
        const mainPhoto = allPhotos.find(p => p.mainPhoto)
        setMainPhoto(mainPhoto?.fileKey)
        const newPhotos = allPhotos.filter(p =>p.mainPhoto === false)
        setFilteredPhotos(newPhotos)
        
    }, [allPhotos])
    useEffect(() => {
        const slidesToShow = 2;
        const settings = {
            dots: true,
            infinite: filteredPhotos.length > slidesToShow,
            speed: 1000,
            slidesToShow: Math.min(slidesToShow, filteredPhotos.length),
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };
        setPhotoSettings(settings)
    },[filteredPhotos])

    useEffect(() => {
        let dates = sessions.map(s => {
            const sessionDate = new Date(s.dateTime)
            if (s.open && sessionDate >= new Date() ) {
                return  sessionDate  // Convert session dateTime to Date object
                
            }
        })
        setHighlightDates(dates)  // Set the highlightDates to an array of Date objects
    }, [sessions])
    useEffect(() => {
        const dateSessions = sessions.filter(s => formatDate(s.dateTime) === formatDate(selectedDate)&& new Date(s.dateTime) >= new Date() && s.open)
        setSelectSessions(dateSessions)
    }, [selectedDate])

    const handleSessionClick = (e) => {
        const sessionId = e.target.dataset.id
        navigate(`/booking/${sessionId}`)
    }
    
    
    

    

    return (
        <Container fluid className="mt-4 ">
            <Row>
                <Col  md={8} className=" text-center d-flex flex-column align-items-center justify-content-center">
                    <div >
                        <img src={mainPhoto ? mainPhoto : 'https://tinyurl.com/sewnashpic'} alt="class picture" className="custom-img rounded border border-3" />
                    </div>
                    {filteredPhotos.length > 0 && 
                    
                    <Container className="border p-2 m-2 mb-4 slider-container rounded" style={{ maxWidth: '500px' }}>
                    <Slider {...photoSettings}>
                        {filteredPhotos.map((photo, index) => (
                            <div key={index}>
                                <img src={photo.fileKey} alt={`class picture ${index}`} className="custom-img rounded border border-3 m-1" />
                            </div>
                        ))}
                    </Slider>
                    </Container>
                    }
                    <Container className="border border-3 bg-light mt-2 rounded" style={{ maxWidth: '500px' }}>
                    <div id='detail-header' className="">
                        <h2>{sewClass.name}</h2>
                        <p></p>
                    </div>
                        <p>location - berry hill  &#8226; {sewClass.duration} hours long</p>
                    
                        <div className="mt-2 ">
                            <h4>Price</h4>
                            <p>{convertToDollars(sewClass.pricePerPerson)}</p>
                        </div>
                        <div>
                            <h4>Description</h4>
                            <p>{sewClass.description}</p>
                        </div>
                    </Container>

                </Col>

                <Col md={4} className=" border-start ">
                <div className="m-4 text-center">

                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => date && setSelectedDate(date)}
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