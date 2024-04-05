import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import ROUTES from '../../../navigations/Routes';

function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=>
  new URLSearchParams(search,[search]));
}

function Department() {

const queryParam=useQuery();
const [departmentId, setDepartmentId]=useState(null);
const [departments, setDepartments]=useState(null);
const [form,setForm]=useState({
  name:"",
  image:null,
  universityId:queryParam.get("id"),
});
const [formError,setFormError]=useState({
    name:"",
    image:"",
});
const navigate=useNavigate();

useEffect(()=>{
  getAll();
},[]);

const changeHandler=(e)=>{
  setForm({...form,
  [e.target.name]:
e.target.value});
}


function getAll(){
  axios.get("http://localhost:8081/department?universityId=" + queryParam.get("id")).then((d)=>{
    setDepartments(d.data.depData);
  });
}


function saveDepartment(){
  const formData=new FormData();
  formData.append("name", form.name);
  formData.append("image",form.image,form.image.name);
  formData.append("universityId",queryParam.get("id"));
  axios.post("http://localhost:8081/department",formData,{
    "content-type":"multipart/form-Data",
  }).then((d)=>{
    alert(d.data.message);
    getAll();
    resetForm();
  }).catch((e)=>{
    console.log("Fail to submit data");
  });
}

function updateDepartment(){
  const formData=new FormData();
  formData.append("name", form.name);
  formData.append("image",form.image,form.image.name);
  formData.append("universityId",queryParam.get("id"));
  formData.append("id",departmentId);
  axios.post("http://localhost:8081/department",formData,{
    "content-type":"multipart/form-Data",
  }).then((d)=>{
    alert(d.data.message);
    getAll();
    resetForm();
  }).catch((e)=>{
    console.log("Fail to update data");
  });
}


function resetForm(){
  setForm({name:"",
image:null});
}

function onDepartmentSubmit(){
  let errors=false;
  let error={
    name:"",
    image:"",
  };
  if(form.name.trim().length===0)
  {
    errors=true;
    error={...error,name:"Please Enter name"};
  }
  if(form.image==null)
  {
    errors=true;
    error={...error,image:"Please select image"};
  }
  if(errors){
    setFormError(error);
  }
  else{
    setFormError(error);
    {
      departmentId?updateDepartment():saveDepartment();
    }
  }
}



function renderDepartments(){
  return departments?.map((item)=>{
    return(
      <tr>
        <td>
          <img src={"http://localhost:8081/" + item.image}
          alt=""
          height="150"
          width="150"
          />
        </td>
        <td>{item.name}</td>
        <td>
          <button onClick={()=>{
            navigate(ROUTES.productAdmin.name+ "?id=" + item._id + "&name=" + item.name)
          }}
          className='btn btn-info'>
            Add Product
          </button>
        </td>
        <td>
          <button className='btn btn-primary'
          onClick={()=>{
            setDepartmentId(item._id);
            setForm({...form,name:item.name});
          }}
          >
            Edit
          </button>
        </td>
        <td>
          <button onClick={()=>{
            deleteDepartment(item._id);
          }}
          className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    );
  });
}


function deleteDepartment(id){
  alert(id);
  let ans=window.confirm('Want to Delete the Data?');
  if(!ans) return;
  axios.delete("http://localhost:8081/department",{data:{id:id}}).then((d)=>{
    alert(d.data.message);
    getAll();
  }).catch((e)=>{
    console.log("Fail to delete the data");
  });
}



  return (
    <div>
       <Header/>
    <div className='row p-2 m-2'>
    <div className="card text-center mx-auto">
  <div class="card-header bg-info text-white">
    {departmentId?"Edit Department":"New Department"}
  </div>
  <div class="card-body">

    <div className='form-group row'>
      <label className='col-lg-4'>
        University Name
      </label>
      <div className='col-lg-8'>
        <input type='text'
        disabled
        value={queryParam.get("name")}
        className='form-control'
        />
      </div>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4'>
        Department Name
      </label>
      <div className='col-lg-8'>
        <input type='text'
        name='name'
        placeholder='Enter Name'
        value={form.name}
        className='form-control'
       onChange={changeHandler}
        />
         <p className='text-danger'>
          {formError.name}
        </p>
      </div>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4'>
        Department Image
      </label>
      <div className='col-lg-8'>
        <input type='file'
        
        onChange={(e)=>{
            let file=e.target.files[0];
            setForm({...form,image:file});
        }}
        className='form-control'
       />
       <p className='text-danger'>
          {formError.image}
        </p>
      </div>
    </div>

  </div>
  <div class="card-footer text-muted">
    {departmentId?(
      <button onClick={()=>{
          onDepartmentSubmit()
      }}
      className='btn btn-info'>
          Update
      </button>
    ):(
    <button className='btn btn-info'
       onClick={()=>{
           onDepartmentSubmit()
  }}>
        Save
    </button>
    )}
  </div>
</div>

</div>

<div className='border m-2 p-2'>
  <table className='table table-bordered table-active table-striped'>
    <thead>
      <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Add Product</th>      
      <th>Edit</th>
      <th>Delete</th>
      </tr>      
    </thead>
    <tbody>
    {renderDepartments()}
    </tbody>
  </table>
</div>
     
    </div>
  )
}

export default Department