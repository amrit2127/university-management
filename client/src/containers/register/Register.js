import React, { useState } from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ROUTES from '../../navigations/Routes';

function Register() {

  const navigate=useNavigate();
  const [form,setForm]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const [formError, setFormError]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const changeHandler=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  function saveUser(){
    try{
    axios.post("http://localhost:8081/register",form).then((d)=>{
      alert(d.data.message);
      navigate(ROUTES.login.name);
    }).catch((e)=>{
      alert("Something went wrong!!!!");
    });
  }  
  catch(error){
    alert("Unable to register user!!!");
  }
  }

function onUserSubmit(){
  let errors=false;
  let error={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"", 
  };
  if(form.firstName.trim().length===0)
  {
    errors=true;
    error={...error,firstName:"Please Enter First Name!!!"};
  }
  if(form.lastName.trim().length===0)
  {
    errors=true;
    error={...error,lastName:"Please Enter Last Name!!!"};
  }
  if(form.email.trim().length===0)
  {
    errors=true;
    error={...error,email:"Please Enter email here!!!"};
  }
  if(form.password.trim().length===0)
  {
    errors=true;
    error={...error,password:"Please Enter password!!"};
  }
  if(form.confirmPassword.trim().length===0)
  {
    errors=true;
    error={...error,confirmPassword:"Please enter your password again to confirm!!!"};
  }
  if(form.password!=form.confirmPassword)
  {
    errors=true;
    error={...error,password:"Password and confirm password do not match!!!"};
  }
  if(!(form.password.length>=6 && form.password.length<=12))
  {
    errors=true;
    error={...error,password:"Password should be between 6 to 12 characters!!!"};
  }
  if(errors)
  {
    setFormError(error);
  }
  else
  {
    setFormError(error);
    saveUser();
  }

}


  return (
    <div>
       <Header/>
    <div className='row m-2 p-2'>
    <div class="card text-center mx-auto">
  <div class="card-header bg-info text-white">
    Register New User
  </div>
  <div class="card-body">
    
    <div className='form-group row'>
    <label className='col-sm-4'>
        First Name
    </label>
    <div className='col-sm-8'>
      <input type='text'
      className='form-control'
      placeholder='Enter first NAme'
      name='firstName'
      onChange={changeHandler}
      />
    </div>
    <p className='text-danger'>
      {formError.firstName}
    </p>
    </div>

    <div className='form-group row'>
    <label className='col-sm-4'>
        Last Name
    </label>
    <div className='col-sm-8'>
      <input type='text'
      className='form-control'
      placeholder='Enter last NAme'
      name='lastName'
      onChange={changeHandler}
      />
    </div>
    <p className='text-danger'>
      {formError.lastName}
    </p>
    </div>

    <div className='form-group row'>
    <label className='col-sm-4'>
        Email
    </label>
    <div className='col-sm-8'>
      <input type='text'
      className='form-control'
      placeholder='Enter email address'
      name='email'
      onChange={changeHandler}
      />
    </div>
    <p className='text-danger'>
      {formError.email}
    </p>
    </div>

    <div className='form-group row'>
    <label className='col-sm-4'>
        Password
    </label>
    <div className='col-sm-8'>
      <input type='password'
      className='form-control'
      placeholder='Enter Password'
      name='password'
      onChange={changeHandler}
      />
    </div>
    <p className='text-danger'>
      {formError.password}
    </p>
    </div>

    <div className='form-group row'>
    <label className='col-sm-4'>
       Confirm Password
    </label>
    <div className='col-sm-8'>
      <input type='password'
      className='form-control'
      placeholder='Enter Pswrd again to confirm'
      name='confirmPassword'
      onChange={changeHandler}
      />
    </div>
    <p className='text-danger'>
      {formError.confirmPassword}
    </p>
    </div>

    


  </div>
  <div class="card-footer text-muted">
    <button className='btn btn-info'
    onClick={onUserSubmit}
    >
      Register
    </button>
  </div>
</div>
    </div>

    </div>
  )
}

export default Register