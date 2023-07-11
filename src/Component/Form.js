import React, { useState } from 'react'

const Form = () => {

    const [form,setform]=useState({})
    const handleform=(e)=>{

        setform({
            ...form,
            [e.target.name]:e.target.value
            })         
    }

     const handleSubmit=async (e)=>{
        e.preventDefault()
       const response= await fetch('http://localhost:8000/',{
        method:'POST',
        body:JSON.stringify(form),
        headers:{
            "content-type":"application/json"
        }
       })
       const result= await response.json()
       console.log(result);


     }
  return (
   <>
   
    
    <form onSubmit={handleSubmit}>

        <p>{JSON.stringify(form)}</p>
        <span>Usename</span>
        <input placeholder='username' name="username" type="text" onChange={handleform}/>
        <span>Password</span>
        <input placeholder='passowrd' name="password" type="text" onChange={handleform}/>
        <input type="submit"></input>

    </form>
   
   
   </>
  )
}

export default Form