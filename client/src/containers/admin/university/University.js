import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ROUTES from '../../../navigations/Routes';

function University() {

  const[universityId, setuniversityId]=useState(null);
  const[universities,setUniversities]=useState(null);
  const[form,setForm]=useState({
    name:"",
    image:null
  });
  const[formError,setFormError]=useState({
    name:"",Image:""
  });
 const navigate=useNavigate();

  const changeHandler=(e)=>{
    setForm({...form,
    [e.target.name]:
  e.target.value});
  };

  useEffect(()=>{
    getAll();
  },[]);


function getAll(){
  axios.get("http://localhost:8081/university").then((d)=>{
    setUniversities(d.data.univData);
  });
}


  function saveUniversity(){
    try {
      const formData=new FormData();
      formData.append("name",form.name);
      formData.append("image",form.image,form.image.name);

      axios.post("http://localhost:8081/university",formData,{
        "content-type":"multipart/form-data",
      }).then((d)=>{
        alert('data saved');
        getAll();
        resetForm();
      })
    } catch (error) {
      console.log("Fail to Submit Data!!!");      
    }
  }


  function updateUniversity(){
    try {
      const formData=new FormData();
      formData.append("name",form.name);
      formData.append("image",form.image,form.image.name);
      formData.append("id",universityId);

      axios.put("http://localhost:8081/university",formData,{
        "content-type":"multipart/form-data",
      }).then((d)=>{
        alert('data update');
        getAll();
        resetForm();
      })
    } catch (error) {
      console.log("Fail to Update Data!!!");      
    }
  } 


function onUniversitySubmit(){
  let errors=false;
  let error={name:"",
  image:"",
};
if(form.name.trim().length===0)
{
  errors=true;
  error={...error, name:"Please Enter name"};
}
if(form.image==null){
  errors=true;
  error={...error, image:"Please Select Image "};
}
if(errors){
  setFormError(error);
}
else{
  setFormError(error);
  {
    universityId ? updateUniversity() : saveUniversity();
  }
}
}


function resetForm(){
  setForm({name:"",
  Image:null,
});
}

function deleteUniversity(id){
  alert(id);
  let ans=window.confirm('Want to Delete data?');
  if(!ans) return;
  axios.delete("http://localhost:8081/university", {data:{id:id}}).then((d)=>{
    getAll();
  }).catch((e)=>{
    alert(e.response?.data?.message);
  }); 

}


function renderUniversities(){
  return universities?.map((item)=>{
    return(
      <tr>
        <td>
          <img src={"http://localhost:8081/"+ item.image} height="150" width="150"/>
        </td>
        <td>{item.name}</td>
        <td>
          <button className='btn btn-info'
          onClick={()=>{
            navigate(ROUTES.departmentAdmin.name+"?id="+item._id+"&name="+item.name);
          }}
          >
            Add Department
          </button>
        </td>
        <td>
          <button className='btn btn-primary'
          onClick={()=>{
            setForm({...form, name:item.name});
            setuniversityId(item._id);
          }}>
            Edit
          </button>
        </td>
        <td>
          <button className='btn btn-danger'
          onClick={()=>{
            deleteUniversity(item._id);
          }}>
            Delete
          </button>
        </td>
      </tr>
    )
  })
}

  return (
    <div>
       <Header/>
       <div className='row p-2 m-2 '>
       <div class="card text-center mx-auto">
  <div class="card-header bg-info text-white">
    {universityId?"Edit University":"New University"}
  </div>
  <div class="card-body">

   <div className='form-group row'>
    <label className='col-lg-4' for="txtname">
      University Name
    </label>
    <div className='col-lg-8'>
      <input 
             type='text' 
             name='name'
              className='form-control'
               placeholder='Enter name' 
               id='txtname'
               onChange={changeHandler}
               value={form.name}
      />
      <p className='text-danger'>
         {formError.name}
      </p>
    </div>
   </div>

   <div className='form-group row'>
    <label className='col-lg-4'>
      University Image
    </label>
    <div className='col-lg-8'>
      <input 
      type='file' name='image' className='form-control'
      value={form.Image}
      onChange={(e)=>{
        let file=e.target.files[0];
        setForm({...form,image:file});
      }}
      />
      <p className='text-danger'>
         {formError.Image}
      </p>
    </div>
   </div>

  </div>

  <div class="card-footer text-muted">
    {universityId?(
      <button onClick={()=>{
        onUniversitySubmit();
      }}
       className='btn btn-info'>
        Update
      </button>
    ):(
      <button onClick={()=>{
        onUniversitySubmit();
      }} 
      className='btn btn-success'>
        Save
      </button>
    )
  }
  </div>
</div>
       </div>
      
<div className='border p-2 m-2'>
  <table className='table table-bordered table-striped table-active'>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Add Department</th>
        <th>Edit</th>
        <th>Delete</th>        
      </tr>
    </thead>
<tbody>
  {renderUniversities()}
</tbody>
  </table>
</div>


    </div>
  )
}

export default University