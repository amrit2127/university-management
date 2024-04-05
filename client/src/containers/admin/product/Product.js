import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function useQuery(){
  const{search}=useLocation();
  return React.useMemo(()=>
  new URLSearchParams(search,[search]));
}

function Product() {

  const [productId, setProductId]= useState(null);
  const [products, setProducts]=useState(null);
  const queryParam=useQuery();
  const navigate=useNavigate();
  const [form, setForm]=useState({
    name:"",
    images:null,
    departmentId:queryParam.get("id"),
    description:"",
    qty:0,
    price:0,
  });
  const [formError,setFormError]=useState({
    name:"",
    images:null,
    description:"",
    qty:"",
    price:"",
  });

 const changeHandler=(e)=>{
  setForm({...form, [e.target.name]: e.target.value});
 } 
 
 useEffect(()=>{
  getAll();
 },[]);


function getAll(){
  axios.get("http://localhost:8081/product?departmentId=" + queryParam.get("id")).then((d)=>{
    setProducts(d.data.productData);
  });
}


function saveProduct(){
  try {
    const formData=new FormData();
    for(let i=0; i<form.images.length; i++)
    {
      formData.append("images",form.images[i],form.images[i].name);
    }
    formData.append("name",form.name);
    formData.append("description",form.description);
    formData.append("price",form.price);
    formData.append("qty",form.qty);
    formData.append("departmentId",queryParam.get("id"));

    axios.post("http://localhost:8081/product",formData,{"content-type":"multipart/form-data",}).then((d)=>{
      alert(d.data.message);
      getAll();
      resetForm();
    }).catch((e)=>{
      console.error("Failed to submit Data");
    });
  } catch (error) {
    console.error("Failed to submit Data");
  }
}

function updateProduct(){
  try {
    const formData=new FormData();
    for(let i=0; i<form.images.length; i++)
    {
      formData.append("images",form.images[i],form.images[i].name);
    }
    formData.append("id",productId);
    formData.append("name",form.name);
    formData.append("description",form.description);
    formData.append("price",form.price);
    formData.append("qty",form.qty);
    formData.append("departmentId",queryParam.get("id"));

    axios.put("http://localhost:8081/product",formData,{"content-type":"multipart/form-data",}).then((d)=>{
      alert(d.data.message);
      getAll();
     resetForm();
    }).catch((e)=>{
      console.error("Failed to submit Data");
    });
  } catch (error) {
    console.error("Failed to submit Data");
  }
}

function onProductSubmit()
{
  let errors = false;
  let error = {
    name:"",
    images:null,
    description:"",
    qty:"",
    price:""
  };
  if(form.name.trim().length==0)
  {
    errors = true;
    error = {...error,name:"Please Enter Name!!!"};
  }
  if(form.images == null)
  {
    errors = true;
    error = {...error,images:"Please Select images!!!"};
  }
  if(form.description.length==0)
  {
    errors = true;
    error = {...error,images:"Please Enter Description!!!"};
  }
  if(form.qty == ""|| form.qty==0)
  {
    errors = true;
    error = {...error,images:"Please Enter quantity!!!"};
  }
  if(form.price == ""|| form.price==0)
  {
    errors = true;
    error = {...error,images:"Please Enter price!!!"};
  }
  if(errors) 
    setFormError(error);
  else{
    setFormError(error);
    {
      productId ? updateProduct(): saveProduct();
    }
  }
}


function deleteProduct(id)
{
 // alert(id);
  let ans = window.confirm("Want To Delete Data?")
  if(!ans)return;
  axios.delete("http://localhost:8081/product",{data:{id:id}}).then((d)=>{
    alert(d.data.message);
   getAll();
  }).catch((e)=>{
    alert("Failed to delete data");
  });
}


function resetForm(){
  setForm
  ({
    name:"",
    images:null,
    departmentId:queryParam.get("id"),
    description:"",
    qty:0,
    price:0,
  });
}


function renderProducts(){
  return products?.map((item)=>{
    return(
      <tr>
        <td>
          <img src={"http://localhost:8081/"+ item.images[0]}
          height="150"
          width="150"
          />
        </td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.qty}</td>
        <td>
          <button className='btn btn-info'
          onClick={()=>{
            setProductId(item._id);
            setForm({
              ...form,
              name:item.name,
              description:item.description,
              qty:item.qty,
              price:item.price,
            });
          }}
          >
            Edit
          </button>
        </td>
        <td>
          <button onClick={()=>{
            deleteProduct(item._id);
          }}
          className='btn btn-danger'>
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
       <div className='row m-2 p-2'>
       <div class="card text-center mx-auto">
  <div class="card-header bg-info text-white">
    {productId?"Edit Product":"New Product"}
  </div>
  <div class="card-body">

    <div className='form-group row'>
      <label className='col-lg-4'>
        Department Name
      </label>
      <div className='col-lg-8'>
        <input type='text'
        disabled
        value={queryParam.get("name")}
        className='form-control'/>
      </div>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4'>
        Product Name
      </label>
      <div className='col-lg-8'>
        <input type='text'
        name='name'
        value={form.name}
        className='form-control'
        placeholder='Enter Name'
        onChange={changeHandler}
        />
      </div>
      <p className='text-danger'>
        {formError.name}
      </p>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4'>
        Description
      </label>
      <div className='col-lg-8'>
        <input type='text'
        name='description'
        value={form.description}
        className='form-control'
        placeholder='Description'
        onChange={changeHandler}
        />
      </div>
      <p className='text-danger'>
        {formError.description}
      </p>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4'>
        Price
      </label>
      <div className='col-lg-8'>
        <input type='number'
        name='price'
        value={form.price}
        className='form-control'
        placeholder='Price'
        onChange={changeHandler}
        />
      </div>
      <p className='text-danger'>
        {formError.price}
      </p>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4'>
        Quantity
      </label>
      <div className='col-lg-8'>
        <input type='number'
        name='qty'
        value={form.qty}
        className='form-control'
        placeholder='Quantity'
        onChange={changeHandler}
        />
      </div>
      <p className='text-danger'>
        {formError.qty}
      </p>
    </div>

    <div className='form-group row'>
      <label className='col-lg-4'>
        Product Image
      </label>
      <div className='col-lg-8'>
        <input type='file'
        className='form-control'
        onChange={(e)=>{
          let file=e.target.files;
          setForm({...form,images:file});
        }}
        multiple
        />
      </div>
      <p className='text-danger'>
        {formError.images}
      </p>
    </div>

  </div>
  <div class="card-footer text-muted">
    {productId?(
      <button onClick={()=>{
        onProductSubmit();
      }}
       className='btn btn-info'>
          Update
      </button>
    ):(
    <button onClick={()=>{
      onProductSubmit();
    }}
    className='btn btn-success'>
        Save
    </button>
    )}
  </div>
</div>
       </div>

<div className='border m-2 p-2'>
  <table className='table table-active table-bordered table-hover'>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {renderProducts()}
    </tbody>
  </table>

</div>



    </div>
  )
}

export default Product