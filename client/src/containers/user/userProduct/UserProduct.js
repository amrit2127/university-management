import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=>
  new URLSearchParams(search,[search]));
}

function UserProduct() {

  const queryParam=useQuery();
  const navigate=useNavigate();
  const [products, setProducts]= useState(null);

  useEffect(()=>{
    getAll();
  },[]);

function getAll(){
  axios.get("http://localhost:8081/product?departmentId=" + queryParam.get("id")).then((d)=>{
    setProducts(d.data.productData);
  });
}

function renderProducts(){
return products?.map((item)=>{
  return(
    <div className='row m-2'>
        <div class="card">
  <img class="card-img-top" src={"http://localhost:8081/" + item.images[0]}
   alt="Card image cap"
   height="200px"
   width="200px"
   />
  <div class="card-body">
    <h5 class="card-title">
      {item.name}
    </h5>
    <h5 class="card-title">
      {item.description}
    </h5>
    <h5 class="card-title">
      {item.price}
    </h5>
    <button onClick={()=>{
      navigate(ROUTES.productDetail.name + "?id="+ item._id)
    }}
    className='btn btn-primary'>
      View Product Details
    </button>
  </div>
</div>
    </div>
  )
})
}

  return (
    <div>
       <Header/>
       <div className='row m-2'>
        {renderProducts()}
       </div>
    </div>
  )
}

export default UserProduct