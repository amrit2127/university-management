import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=>
  new URLSearchParams(search,[search]));
}


function UserDepartment() {

const queryParam=useQuery();
const navigate=useNavigate();
const [departments, setDepartments]=useState(null);

useEffect(()=>{
  getAll();
},[]);

function getAll(){
  axios.get("http://localhost:8081/department?universityId=" + queryParam.get("id")
  ).then((d)=>{
    setDepartments(d.data.depData);
  });
}

function renderDepartments(){
  return departments?.map((item)=>{
    return(
      <div className='col-3'>
        <div class="card">
    <img class="card-img-top" src={"http://localhost:8081/" + item.image} 
    alt="Card image cap"
    height="200px"
    width="200px"
    />
    <div class="card-body">
      <h5 class="card-title">
        {item.name}
      </h5>
      <button onClick={()=>{
        navigate(ROUTES.product.name+"?id=" +item._id)
      }}
      className='btn btn-primary'
      >
        View Products
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
        {renderDepartments()}
       </div>
    </div>
  )
}

export default UserDepartment