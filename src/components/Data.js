import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom';

function Data() {
    let [data,setData] = useState([]);
    let navigate = useNavigate();

    let fetchData = async()=>{
        let response = await axios.get('https://fakestoreapi.com/products')
        setData(response.data);
        console.log('onload',data);
    }

    useEffect(()=>{
       if(localStorage.getItem('currUser')) fetchData();
       else navigate('/');
    },[])

    let handleLogout = () =>{
        localStorage.removeItem('currUser');
        navigate('/');
    }
    
  return (
    <div>
    <h1 style={{textAlign:'center'}}>Data</h1>
    <button onClick={handleLogout} className='btn' style={{marginLeft:'10vw'}}>Log Out</button>
    <div id='details'>
        {data.map((element,idx)=>{
        return <div key={idx} className='element'>
            <h2>{element.id}</h2>
            <p>{element.title}</p>
            <p>{element.description}</p>
        </div>
      })}
    </div>
    </div>
  )
}

export default Data
