import React from 'react'

function Checkout() {
  return (
   <div className='container '
    style={{ display: 'flex', height: '100vh' }}>
      
     <img
      // src="https://png.pngtree.com/png-clipart/20211226/original/pngtree-order-confirmed-sale-tags-with-check-mark-icon-png-image_6979171.png"
       src="https://cdni.iconscout.com/illustration/premium/thumb/order-confirmation-5365232-4500195.png"
       alt="purchase-order"
       style={{ width: '250px', height: '250px' }}  
       className='text-success'     
     />

       <h2 className='text-black'>
        <br/> <br/> 
       Your Order is successfully confirmed !!!
       Thank You for choosing us.            
            </h2>
    
   </div>
  )
}


export default Checkout;
