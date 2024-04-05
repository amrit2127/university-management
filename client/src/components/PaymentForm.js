import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const navigate=useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      console.error(error);
      setPaymentError('Payment failed');
    } else {
      // Send token to your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1300, // replace with the actual amount
        }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Faruq Yusuff"
          },
        },
      });

      if (result.error) {
        console.error(result.error);
        setPaymentError('Payment failed');
      } else if (result.paymentIntent.status === 'succeeded') {
        // Payment succeeded
        setPaymentError(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" onClick={()=>{navigate('/checkout')}}
      className='btn btn-success'
      >
        Pay
        </button>
      {paymentError && <div>{paymentError}</div>}
    </form>
  );
};

export default PaymentForm;  
      
