import { useEffect, useState } from "react"
import { Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap"
import { getSessionById } from "../../../managers/sessionManager"
import { useParams } from "react-router-dom"
import { formatAmericanDate } from "../../../managers/FormatFunctions"
import InputMask from 'react-input-mask'

import * as Yup from "yup";
import { PaymentForm } from "./PaymentForm"
import { getStripeForm, UpdateStripeForm } from "../../../managers/StripeManager"
import './BookingForm.css'
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
export const BookingForm = () => {
    const [session, setSession] = useState({})
    const {sessionId} = useParams()
    const [stripeData, setStripeData] = useState("")
    const [errors, setErrors] = useState({})
    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState(null);
    
    const [priceOccupancy, setPriceOccupancy] = useState(0)
    const stripe = useStripe(); // Hook to access the stripe object
    const elements = useElements(); // Hook to access elements

    const [bookingForm, setBookingForm] = useState({
         name: "",
         dateBooked: "" ,
         phoneNumber: "",
         occupancy: 1,
         email: "",
         sessionId: parseInt(sessionId)
 
        })
    useEffect(() => {
        const sewClass = session.sewClass

        
        if (sewClass && !priceOccupancy ) {
            const stripeObj = {
                id: `sewClass_${sewClass.id}`,
                amount: sewClass.pricePerPerson * 100,
                quantity: 1
            }
            const items = [stripeObj]
            const itemsObj = { items: items}
            getStripeForm(itemsObj).then(res => {
                setStripeData(res)
            })
            
        }else if (priceOccupancy ) {
            const stripeObj = {
                id: `sewClass_${sewClass.id}`,
                amount: sewClass.pricePerPerson * 100,
                quantity: priceOccupancy
            }
            const items = [stripeObj]
            const itemsObj = {paymentIntentId: stripeData.paymentIntentId,items: items}
            UpdateStripeForm(itemsObj).then(res => {
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
    email: Yup.string().email("invalid email").required("Must enter an email"),
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
   
      const options = {
        clientSecret: stripeData.clientSecret
        
      };

    return (
         <Container className="bg-light bg-opacity-50 border border-3 rounded p-3 mt-3">
            <header>
                <h4>{session.sewClass?.name}</h4>
                <p>{formatAmericanDate(session?.dateTime)}{" "}{session.day?.dayOfWeek}{" "}{session.time?.startTime}</p>
            </header>
                <Form  >
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
                            <Label>Email</Label>
                            <Input
                            type="text"
                            name="email"
                            value={bookingForm.email || ""}
                            onChange={handleChange}
                            invalid= {!!errors?.email}
                        
                            />
                            <FormFeedback type='invalid'>{errors.email}</FormFeedback>
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
                            max={maxPeople || 1}
                            min={1}
                        
                            />
                            <FormFeedback type='invalid'>{errors.occupancy}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                </Col>
                <Col >
                    <div className="payment-form-container ">
                    <Container id="checkout">
                        { options.clientSecret &&
                        <Elements stripe={stripePromise}  options={options}>
                           <PaymentForm stripeData={stripeData} validationSchema={validationSchema} bookingForm={bookingForm} setErrors={setErrors}  setMessage={setMessage} options={options} elements={elements} stripe={stripe}/>
                        </Elements>

                        }
                    </Container>

                       
                       
                    </div>
                </Col>
                   
            </Row>
                    </Form>

         </Container>
    )
}