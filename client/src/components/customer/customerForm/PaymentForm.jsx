/* eslint-disable react/prop-types */
import {  PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button, Container} from "reactstrap";

import { PostBooking } from "../../../managers/bookingManager";
import { convertToDollars } from "../../../managers/FormatFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './PaymentForm.css'

export const PaymentForm = ({ stripeData, validationSchema, bookingForm, setErrors, options, }) => {
    
  const stripe = useStripe(); // Hook to access the stripe object
  const elements = useElements();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);



    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                    
                    await validationSchema.validate(bookingForm, {abortEarly: false})
            } catch (validationErrors) {
                const formattedErrors = validationErrors.inner.reduce((acc,err) => {
                    acc[err.path] = err.message
                    return acc
                }, {})
                setErrors(formattedErrors)
            }
                    
                    
                
                    setIsLoading(true);
                
                   stripe.confirmPayment({
                    elements ,
    
                    confirmParams: {
                        // Make sure to change this to your payment completion page
                        return_url: "http://localhost:5173/",
                        
                    },
                    redirect:"if_required"
                    }).then((res) => {
                      if (res.paymentIntent?.status === "succeeded") {
                        bookingForm.dateBooked = Date.now
                        bookingForm.occupancy = parseInt(bookingForm.occupancy)
                        PostBooking(bookingForm).then(() => {
                          setIsLoading(false)
                          window.alert("booking complete!!!")
                          navigate("/")
                        
                        })

                      }
                      else  {
                          window.alert(`${res.error?.message}`)
                        } 
                    })
          }; 

    

    
    return (
      <Container id="checkout">
        { options.clientSecret &&
            <div>

            <PaymentElement />
            <div className="d-flex justify-content-between">
                <h3 className="text-bold">Total</h3>
                <h3>{stripeData ? convertToDollars(stripeData?.totalAmount) : "$0"}</h3>
            </div>
            <Button variant="primary" color="primary" disabled={isLoading || !stripe || !elements} onClick={handleSubmit} className="mt-3 ">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
              </span>
            </Button>
            </div>
         

        }
      </Container>
    )
        
}