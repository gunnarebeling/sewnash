import { CardElement, Elements, EmbeddedCheckout, EmbeddedCheckoutProvider, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { Button, Container, Form } from "reactstrap";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
export const PaymentForm = ({handlePaymentSuccess, stripeData}) => {
    const stripe = useStripe()
    const elements = useElements()
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }


        

    }

    const options = {
      clientSecret: "pi_3QhhtoGKgnsp6NWb1H2pQWd0_secret_x67ELe7daVa1rM9w1UAkAQJJ9"
      
    };
    return (
      <Container id="checkout">
        <Elements stripe={stripePromise}  options={options}>
          <PaymentElement />

        </Elements>
    </Container>
    )
        
}