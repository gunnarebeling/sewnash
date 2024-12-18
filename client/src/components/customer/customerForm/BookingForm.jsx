import { useEffect, useState } from "react"
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { getSessionById } from "../../../managers/sessionManager"
import { useNavigate, useParams } from "react-router-dom"
import { formatAmericanDate } from "../../../managers/FormatFunctions"
import InputMask from 'react-input-mask'
import { PostBooking } from "../../../managers/bookingManager"


export const BookingForm = () => {
    const [session, setSession] = useState({})
    const {sessionId} = useParams()
    const navigate = useNavigate()
    const [bookingForm, setBookingForm] = useState({
         name: "",
         dateBooked: "" ,
         phoneNumber: "",
         occupancy: 0,
         sessionId: parseInt(sessionId)
 
     })
    useEffect(() => {
        getSessionById(sessionId).then(setSession)
    }, [sessionId])

    const handleChange = (e) => {
        const {name , value} = e.target
        let copy = {...bookingForm,
            [name]: value
        }
        setBookingForm(copy)
    }
    const maxPeople = session.sewClass?.maxPeople - session.totalPeople

    const handleSubmit = (e) => {
        e.preventDefault()
        bookingForm.dateBooked = Date.now
        bookingForm.occupancy = parseInt(bookingForm.occupancy)
        PostBooking(bookingForm).then(() => {
            navigate("/")
        });
    }

    return (
         <Container>
            <header>
                <h4>{session.sewClass?.name}</h4>
                <p>{formatAmericanDate(session?.dateTime)}{" "}{session.day?.dayOfWeek}{" "}{session.time?.startTime}</p>
            </header>

            <Form onSubmit={handleSubmit} >
                <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                    type="text"
                    name="name"
                    value={bookingForm.name || ""}
                    onChange={handleChange}
                    // invalid= {!!errors?.sizeId}
                
                    />
                    {/* <FormFeedback type='invalid'>{errors.sizeId}</FormFeedback> */}
                </FormGroup>
                <FormGroup>
                    <Label>Phone Number</Label>
                    <InputMask
                        mask="999-999-9999"
                        name="phoneNumber"
                        value={bookingForm.phoneNumber ||""}
                        onChange={handleChange}
                        maskChar={null}    
                    >
                        {(inputProps) => (
                            <Input {...inputProps} /> 
                        )}
                    </InputMask>
                    
                  
                    {/* <FormFeedback type='invalid'>{errors.sauceId}</FormFeedback> */}
                </FormGroup>
                <FormGroup>
                    <Label>people</Label>
                    <p>{maxPeople} slots left</p>
                    <Input
                    type="number"
                    name="occupancy"
                    value={bookingForm.occupancy || ""}
                    onChange={handleChange}
                    max={maxPeople}
                    // invalid= {}
                
                    />
                    {/* <FormFeedback type='invalid'>{errors.cheeseId}</FormFeedback> */}
                </FormGroup>
                <FormGroup>
                </FormGroup>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
         </Container>
    )
}