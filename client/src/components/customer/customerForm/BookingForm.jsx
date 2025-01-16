import { useEffect, useState } from "react"
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap"
import { getSessionById } from "../../../managers/sessionManager"
import { useNavigate, useParams } from "react-router-dom"
import { convertToDollars, formatAmericanDate } from "../../../managers/FormatFunctions"
import InputMask from 'react-input-mask'
import { PostBooking } from "../../../managers/bookingManager"
import * as Yup from "yup";
import { PaymentForm } from "./PaymentForm"
import { getStripeForm } from "../../../managers/StripeManager"
import './BookingForm.css'


export const BookingForm = () => {
    const [session, setSession] = useState({})
    const {sessionId} = useParams()
    const [stripeData, setStripeData] = useState("")
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [priceOccupancy, setPriceOccupancy] = useState()
    const [bookingForm, setBookingForm] = useState({
         name: "",
         dateBooked: "" ,
         phoneNumber: "",
         occupancy: 0,
         sessionId: parseInt(sessionId)
 
        })
    useEffect(() => {
        const sewClass = session.sewClass

        
        if (sewClass && priceOccupancy ) {
            const stripeObj = {
                id: `sewClass_${sewClass.id}`,
                amount: sewClass.pricePerPerson * 100,
                quantity: priceOccupancy
            }
            const items = [stripeObj]
            const itemsObj = { items: items}
            getStripeForm(itemsObj).then(res => {
                setStripeData(res)
            })
            
        }
    }, [session, priceOccupancy])
        
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
        if (name === "occupancy") {
            setPriceOccupancy(parseInt(value))
        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     if (!stripe || !elements) {
    //       // Stripe.js hasn't yet loaded.
    //       // Make sure to disable form submission until Stripe.js has loaded.
    //       return;
    //     }
    
    //     setIsLoading(true);
    
    //     const { error } = await stripe.confirmPayment({
    //       elements,
    //       confirmParams: {
    //         // Make sure to change this to your payment completion page
    //         return_url: "http://localhost:3000/complete",
    //       },
    //     });
    
    //     // This point will only be reached if there is an immediate error when
    //     // confirming the payment. Otherwise, your customer will be redirected to
    //     // your `return_url`. For some payment methods like iDEAL, your customer will
    //     // be redirected to an intermediate site first to authorize the payment, then
    //     // redirected to the `return_url`.
    //     if (error.type === "card_error" || error.type === "validation_error") {
    //       setMessage(error.message);
    //     } else {
    //       setMessage("An unexpected error occurred.");
    //     }
    
    //     setIsLoading(false);
    //   };

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
         <Container className="">
            <header>
                <h4>{session.sewClass?.name}</h4>
                <p>{formatAmericanDate(session?.dateTime)}{" "}{session.day?.dayOfWeek}{" "}{session.time?.startTime}</p>
            </header>
                <Form onSubmit={handleSubmit} >
            <Row>
                <Col 
                    md={5}
                    sm={12}
                    order={{ sm: 1, md: 1 }}
                    className="mb-5"
                    >
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
                            max={maxPeople}
                            min={1}
                        
                            />
                            <FormFeedback type='invalid'>{errors.occupancy}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                </Col>
                <Col >
                    <div className="payment-form-container ">
                        <PaymentForm stripeData={stripeData}/>

                        <div className="py-3 px-2">
                            
                            <div className="d-flex justify-content-between">
                                <h3 className="text-bold">Total</h3>
                                <h3>{stripeData ? convertToDollars(stripeData?.totalAmount) : "$0"}</h3>
                            </div>
                        </div>
                    </div>
                </Col>
                    <div className="d-flex p-3 pb-5 text-center d-flex justify-content-center">

                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </div>
            </Row>
                    </Form>

         </Container>
    )
}