import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ROUTES from '../../../navigations/Routes';

function Home() {

  const [universities, setUniversities]=useState(null);
  const navigate=useNavigate();

useEffect(()=>{
  getAll();
},[]);

  function getAll(){
    axios.get("http://localhost:8081/university").then((d)=>{
      setUniversities(d.data.univData);
    });
  }


  function renderUniversities(){
    return universities?.map((item)=>{
      return(
        <div className='col-3'>
          <div class="card">
               <img class="card-img-top" src={"http://localhost:8081/" + item.image} 
                         alt="Card image cap"
                         height="200px"
                         width="200px"/>
            <div class="card-body">
           <h5 class="card-title">
            {item.name}
           </h5>
          <button onClick={()=>{
            navigate(ROUTES.department.name + "?id=" + item._id);
          }}
          className='btn btn-success'>
            View Department
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
        {renderUniversities()}
      </div>
    </div>
  )
}

export default Home