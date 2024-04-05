import React, { useState } from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../navigations/Routes';

function Login() {
const navigate=useNavigate();
const [form,setForm]=useState({
  email:"",
  password:""
});
const [formError,setFormError]=useState({
  email:"",
  password:"",
});
const changeHandler=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
};

function onLoginRequest(){
  try{
    axios.post("http://localhost:8081/login",form)
    .then((d)=>{
      alert("Login Successful");
      localStorage.setItem("id",d.data.id);
      localStorage.setItem("role", d.data.role);
      if(d.data.role === "admin") navigate(ROUTES.universityAdmin.name);
      else
      navigate(ROUTES.home.name);
    })
    .catch((e)=>{
      alert("Wrong User / password");
      setForm({...form,email:"",password:""});
    });
  }catch(error){
    alert("Unable to Login");
  }
}


function onLoginSubmit(){
  let errors=false;
  let error={
    email:"",
    password:"",
  }

  if(form.email.trim().length===0)
  {
    errors=true;
    error={...error,email:"Email empty!!"}
  }

  if(form.password.trim().length===0)
  {
    errors=true;
    error={...error,password:"Please enter password here!!"}
  }

  if(errors)
  {
    setFormError(error);
  }
  else{
    setFormError(error);
    onLoginRequest();
  }

}

  return (
    <div>
       <Header/>
       <div className='row m-2'>
       <div class="card text-center mx-auto">
  <div class="card-header bg-info text-white">
    Login
  </div>
  <div class="card-body">

    <div className='form-group row'>
    <label className='col-lg-4'>
      Username
    </label>
    <div className='col-8'>
      <input type='text'
      name='email'
      placeholder='Please enter email'
      className='form-control'
      onChange={changeHandler}
      />
    </div>
    <p className='text-danger'>
      {formError.email}
    </p>
    </div>

    <div className='form-group row'>
    <label className='col-lg-4'>
      Password
    </label>
    <div className='col-8'>
      <input type='password'
      name='password'
      placeholder='Please enter password'
      className='form-control'
      onChange={changeHandler}
      />
    </div>
    <p className='text-danger'>
      {formError.password}
    </p>
    </div>
    
    
  </div>
  <div class="card-footer text-muted">
    
    <button onClick={onLoginSubmit} className='btn btn-primary'>
      Login
    </button>
  </div>
</div>
       </div>
    </div>
  )
}

export default Login