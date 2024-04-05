
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../../components/PaymentForm';

function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stripePromise = loadStripe('pk_test_51OdpXTJDcbtZGU8vTc9VrQgJQ7zkGZPTgN2XvNbrgsvNyfNPlG8W0DpyeeFCvt7xXmPYE4FZEXcqztdF8srGQCgh00zMvHcFIL');

  useEffect(() => {
    getAll();
  }, []);
  
const calculateCartTotal = () => {
  if (!cartItems) return 0;
  return cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    const itemQuantity = parseInt(item.count);
    return total + (isNaN(itemPrice) || isNaN(itemQuantity) ? 0 : itemPrice * itemQuantity);
  }, 0);
};

const cartTotal = calculateCartTotal();
// console.log("Cart Total: ", cartTotal);


  function getAll() {
    axios
      .get("http://localhost:8081/shoppingCart")
      .then((response) => {
        setCartItems(response.data.cartData);
      })
      .catch((error) => {
        setError("Error fetching cart items. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }
 
const removeItemFromCart = (itemId) => {
  setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
};


  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>Shopping Cart</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div>
            {cartItems?.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`http://localhost:8081/${item.product.images}`}
                          alt={item.product.productName}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            {item.product.productName}
                          </h5>
                          <p className="card-text">Quantity: {item.count}</p>
                          <p className="card-text">Price: {item.count * item.product.price}</p>                         
                         
                          <button className="btn btn-danger" onClick={() => removeItemFromCart(item.id)}>
                            Remove
                          </button>                         
                         
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
               <div className="fw-bold">Total: ${calculateCartTotal().toFixed(2)}</div>
               <br/>
               <br/>

                <div className="text-center">

                <p className='text-primary'
                >Stripe Payment Integration</p>
                
                   <Elements stripe={stripePromise}>
                     <PaymentForm />        
                   </Elements>
                 
                </div>                
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;


