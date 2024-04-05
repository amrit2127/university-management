import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=>
  new URLSearchParams(search,[search]));
}


function ProductDetail() {

 const queryParam=useQuery();
 const navigate= useNavigate();
const [products, setProducts]=useState(null);

const [form, setForm] = useState({
  user: localStorage.getItem("id"),
  product: queryParam.get("id"),
  count: 1,
});

const [formError, setFormError] = useState({
  count: "",
});

function incrementCount() {
  setForm((prevState) => ({
    ...prevState,
    count: prevState.count ? parseInt(prevState.count, 10) + 1 : 1,
  }));
}

function decrementCount() {
  setForm((prevState) => ({
    ...prevState,
    count: prevState.count > 1 ? parseInt(prevState.count, 10) - 1 : 1,
  }));
}

  useEffect(()=>{
    getAll()
  },[]);
  
  function getAll(){
  axios.get("http://localhost:8081/productDetails?id=" + queryParam.get("id")).then((d)=>{
    setProducts(d.data.productData);
  });
  }

  function renderImages(){
    return products?.images?.map((item)=>{
      return(
        <img class="card-img-top" src={"http://localhost:8081/" + item} 
        height="250px" width="200px"/>
      );
    });
  }

  const changeHandler = (e) => {
    setForm({ ...form, count: e.target.value });
  };
  
  function onCartSubmit() {
    axios
      .post("http://localhost:8081/shoppingCart", form)
      .then((response) => {
        // Handle success
        alert("Product Successfully added to the cart !!  Please check your cart !!");
        navigate(ROUTES.cart.name);
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding to cart:", error);
      });
  }



  return (
    <div>
       <Header/>

       <div className="container mt-4">
        <div className="card text-center">
          <div className="card-header bg-info text-white">Product Details</div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="text-center">
                  {renderImages()}
                  </div>
              </div>
              <div className="col-md-6">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <b>Product Name</b>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={products?.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <b>Product Description</b>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={products?.description}
                      disabled
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <b>Product Price</b>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      value={products?.price}
                      disabled
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <b>Count</b>
                  </div>
                  <div className="col-md-8">
                  <button onClick={decrementCount} className="btn btn-secondary m-2 p-1">-</button>
                       <input
                         type="text"                         
                         onChange={changeHandler}
                         value={form.count}
                       />
                  <button onClick={incrementCount} className="btn btn-secondary m-2 p-1">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-white">
            <div className="form-group row">
              <div className="col-6">
                <button
                  onClick={() => navigate(ROUTES.home.name)}
                  className="btn btn-primary"
                >
                  Back To Home
                </button>
              </div>
              <div className="col-6">
                <button onClick={onCartSubmit} className="btn btn-success">
                  Add to Cart
                </button>
                <br/> <br/>
                <button className='btn btn-danger'

                 >
                  {/* <i className='fa fa-trash'></i>&nbsp; Empty Cart */}
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;








//        <div className="container row m-2 p-2">
//     <div class="card text-center mx-auto">
//   <div style={{display:"flex",flexDirection:"row"}}>
//     {renderImages()}
//   </div>
//   <div class="card-body">
//     Product:
//     <h5 class="card-title">{products?.name}</h5>
//     Description:
//     <h6 class="card-title">{products?.description}</h6>
//     Total Items :
//     <h6 class="card-title">{products?.qty}</h6>
//     Price:
//     <h6 class="card-title">{products?.price}</h6>
//     <button onClick={()=>{navigate(ROUTES.cart.name + "?id="+products._id)}} 
//     class="btn btn-primary">
//       Add To Cart
//       </button>
//   </div>
// </div>
//     </div>




//     <div className='container border p-2 m-2'>
//       <div className='col-4'>
//       <section>
//         <div>
//          {renderImages()}
//         </div>
//       </section>
//       </div>

//       <div className='col-8'>
//       Product:
//     <h5>{products?.name}</h5>
//     Description:
//     <h6>{products?.description}</h6>
//     Total Items :
//     <h6 >{products?.qty}</h6>
//     Price:
//     <h6 >{products?.price}</h6>
//     <button onClick={()=>{navigate(ROUTES.cart.name + "?id="+products._id)}} 
//     class="btn btn-primary">
//       Add To Cart
//       </button>
//       </div>
      
//     </div>

//     </div>
//   )
// }
