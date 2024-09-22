import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

function CheckoutForm ({ onPaymentSuccess, amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoaing] = useState(false);

    function handleSubmit (e) {
        e.preventDefault();
        setLoaing(true)

        // fetch('http://127.0.0.1:5000/create-payment-intent',{
        fetch('https://final-project-database.onrender.com/create-payment-intent',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ amount })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Data:', data);
            const { clientSecret } = data;
            if (!clientSecret) {
                throw new Error('Client secret is undefined');
            }
            const cardElement = elements.getElement(CardElement);
            return stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });
        })
        .then(({ paymentIntent, error }) => {
            if (error) {
                setErrorMessage(error.message);
                setLoaing(false);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                onPaymentSuccess();
                setLoaing(false);
            }
        })
        .catch(error => {
            setErrorMessage(error.message || 'An unexpected error occurred');
            setLoaing(false);
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                {errorMessage && <p style={{ color: 'red', marginTop:'20px' }}>{errorMessage}</p>}
                <button disabled={!stripe || loading} 
                 style={{width:'150px', height:'40px', fontSize:'15px', backgroundColor:'blue', color:'white', fontWeight:'700', padding:'5px', cursor:'pointer', marginBottom:'20px'}}
                >
                {loading ? 'Processing...' : 'Pay'}
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm;