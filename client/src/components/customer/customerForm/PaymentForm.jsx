/* eslint-disable react/prop-types */
import { CardElement, Elements, EmbeddedCheckout, EmbeddedCheckoutProvider, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { Button, Container, Form } from "reactstrap";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
export const PaymentForm = ({ stripeData}) => {
    
    



        

    

    const options = {
      clientSecret: stripeData.clientSecret
      
    };
    return (
      <Container id="checkout">
        { options.clientSecret &&
          <Elements stripe={stripePromise}  options={options}>
            <PaymentElement />

          </Elements>

        }
    </Container>
    )
        
}