import { CardElement, EmbeddedCheckout, EmbeddedCheckoutProvider, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button, Container, Form } from "reactstrap";

export const PaymentForm = ({handlePaymentSuccess, stripeData}) => {
    const stripe = useStripe()
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }


        

    }

    const options = {
      clientSecret: stripeData
      
    };
    return (
      <Container id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripe}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Container>
    )
        
}