import React from 'react'

const Validate = (email) => {
  const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   const isValid=emailRegex.test(email)
   console.log(isValid,email,"isvalid");
   if(isValid==false){
    return "Inavlid Email"
   }
    return null
   }


export default Validate