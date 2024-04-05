import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../navigations/Routes';

function Header() {
const [user,setUser]=useState({
  id:null,
  role:null,
});
const navigate=useNavigate();

useEffect(()=>{
  let id=localStorage.getItem("id");
  let role=localStorage.getItem("role");
  if(id) setUser({
    id:id,
    role:role,
  });
},[]);

function renderMenu(){
  if(user?.role==="admin")
  {
    return(
      <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to={ROUTES.universityAdmin.name} 
              class="nav-link" 
              >
          University Management
          </Link> 
        </li>
        <li class="nav-item active">
        <Link to={ROUTES.home.name} 
              class="nav-link" 
              >
          User Management
          </Link> 
        </li>
        <li class="nav-item active">
        <Link to={ROUTES.home.name} 
              class="nav-link" 
              >
         Order Management
          </Link> 
        </li>
    </ul>
    );
  }

else{
  return(
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <Link to={ROUTES.home.name} 
            class="nav-link" 
            >
        Home
        </Link> 
      </li>
      <li class="nav-item active">
      <Link to={ROUTES.about.name} 
            class="nav-link" 
            >
        About
        </Link> 
      </li>
      <li class="nav-item active">
      <Link to={ROUTES.contact.name} 
            class="nav-link" 
            >
       Contact
        </Link> 
      </li>
      <li class="nav-item active">
      <Link to={ROUTES.support.name} 
            class="nav-link" 
            >
             Support
        </Link> 
      </li>
      <li className="nav-item active">
           <Link className="nav-link" to={user?.id ? ROUTES.cart.name : ROUTES.login.name}>
           <img width="30" height="30"
            src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
             alt="shopping-cart--v1"/>
           </Link>
         </li>

  </ul>
  );
}

}


function renderButtons(){
  if(user?.id)
  {
    return(
      <div>
           <a class="btn btn-outline-success my-2 my-sm-0" type="submit"
           onClick={()=>{
            localStorage.clear();
            navigate(ROUTES.login.name);
           }}>
            LogOut
           </a>
      </div>
    )
  }
else{
  return(
    <div>
      
           <Link to={ROUTES.register.name} 
            class="btn btn-outline-success my-2 my-sm-0" 
            type="submit"
            >
            Register
           </Link>

           <Link to={ROUTES.login.name} 
            class="btn btn-outline-success my-2 my-sm-0" 
            type="submit"
            >
            Login
           </Link>
    </div>
  );
}


}



  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {renderMenu()}

      {renderButtons()}    
    
  </div>
    </nav>
    </div>
  )
}

export default Header