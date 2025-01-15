import { useEffect, useState } from "react"
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap"
import { getSessionById } from "../../../managers/sessionManager"
import { useNavigate, useParams } from "react-router-dom"
import { formatAmericanDate } from "../../../managers/FormatFunctions"
import InputMask from 'react-input-mask'
import { PostBooking } from "../../../managers/bookingManager"
import * as Yup from "yup";
import { PaymentForm } from "./PaymentForm"
import { getStripeForm } from "../../../managers/StripeManager"


export const BookingForm = () => {
    const [session, setSession] = useState({})
    const {sessionId} = useParams()
    const [stripeData, setStripeData] = useState("")
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [bookingForm, setBookingForm] = useState({
         name: "",
         dateBooked: "" ,
         phoneNumber: "",
         occupancy: 0,
         sessionId: parseInt(sessionId)
 
        })
    useEffect(() => {
        const classId = session.sewClassId
        if (classId) {
            getStripeForm(classId).then(res => {
                setStripeData(res.clientSecret)
            })
            
        }
    }, [session])
        
    const maxPeople = session.sewClass?.maxPeople - session.totalPeople

    const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
        .matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format 123-456-7890")
        .required("Phone number is required"),
    occupancy: Yup
    .number()
    .required("Age is required")
    .integer("Age must be an integer")
    .min(1, "must be at least one person")
    .max(maxPeople, "group cannot exceed the spots left")
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        bookingForm.dateBooked = Date.now
        bookingForm.occupancy = parseInt(bookingForm.occupancy)
        try {
            await validationSchema.validate(bookingForm, {abortEarly: false})
            setErrors({})
            PostBooking(bookingForm).then(() => {
                navigate("/")
            });
            
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc,err) => {
                acc[err.path] = err.message
                return acc
            }, {})
            setErrors(formattedErrors)
        }
    }

    return (
         <Container>
            <header>
                <h4>{session.sewClass?.name}</h4>
                <p>{formatAmericanDate(session?.dateTime)}{" "}{session.day?.dayOfWeek}{" "}{session.time?.startTime}</p>
            </header>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Label>Full Name</Label>
                            <Input
                            type="text"
                            name="name"
                            value={bookingForm.name || ""}
                            onChange={handleChange}
                            invalid= {!!errors?.name}
                        
                            />
                            <FormFeedback type='invalid'>{errors.name}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone Number</Label>
                            <InputMask
                                mask="999-999-9999"
                                name="phoneNumber"
                                value={bookingForm.phoneNumber ||""}
                                onChange={handleChange}
                                maskChar={null}
                                invalid= {!!errors?.phoneNumber}    
                            >
                                {(inputProps) => (
                                    <Input {...inputProps} /> 
                                )}
                            </InputMask>
                            
                        
                            <FormFeedback type='invalid'>{errors.phoneNumber}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>people</Label>
                            <p>{maxPeople} slots left</p>
                            <Input
                            type="number"
                            name="occupancy"
                            value={bookingForm.occupancy || ""}
                            onChange={handleChange}
                            invalid= {!!errors?.occupancy}
                        
                            />
                            <FormFeedback type='invalid'>{errors.occupancy}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <PaymentForm stripeData={stripeData}/>
                </Col>
            </Row>

         </Container>
    )
}