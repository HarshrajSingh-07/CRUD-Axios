import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Edit() {
    const[id,setId]=useState(0);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[number,setNumber]=useState('');
    
    const navigate=useNavigate()

    useEffect(()=>{
        setId(localStorage.getItem('id'))
        setName(localStorage.getItem('name'))
        setEmail(localStorage.getItem('email'))
        setNumber(localStorage.getItem('number'))
    },[])
    function Update(e){
        e.preventDefault();
        axios.put(`http://localhost:8000/users/${id}`,{
            name: name,
            email: email,
            number: number,
        }).then(()=>{
            navigate('/')
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div>
            <Link to="/">
              <button className="btn btn-success my-3">Read Data</button>
            </Link>
          </div>
          <h1>Update Data</h1>
          <form onSubmit={Update}>
            <div className="form-group ">
              <label>Enter Name: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <label>Enter Email: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <label>Enter No: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Number"
                value={number}
                onChange={(e)=>{setNumber(e.target.value)}}
              />
            </div>
            <br />
            <button type="submit" value='Update' className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
