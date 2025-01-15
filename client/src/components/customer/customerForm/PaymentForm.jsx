import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button, Form } from "reactstrap";

export const PaymentForm = ({handlePaymentSuccess}) => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }


        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });

          if (error) {
            console.error(error);
          } else {
            handlePaymentSuccess(paymentMethod);
          }

    }
    return (
    <Form onSubmit={handleSubmit}>
        <CardElement />
        <Button type="submit" color="primary" disabled={!stripe}>
        Pay
      </Button>
    </Form>
    )
        
}