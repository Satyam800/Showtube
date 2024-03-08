import React, { useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import Validate from "../Utils/Validate";
import { ForgotPassword,emailsave } from "../Utils/authSlice";
import { Link } from "react-router-dom";
const ResetPassword = () => {
const emailRef=useRef()
const dispatch=useDispatch()
const resetEmaiValidation=useSelector(store=>store.auth.reset)
const handleSend=(otpLength)=>{
const isvalidEmail=Validate(emailRef.current.value)
let otp=""
const characters = '0123456789'
function generateOTP(){
for(let i=1;i<=otpLength;i++){
 otp += characters.charAt(Math.floor(Math.random()*10))
}
return otp 
}
const genOtp=generateOTP()
console.log(genOtp,"otp");
if(isvalidEmail==null){
  JSON.stringify(localStorage.setItem("email",emailRef.current.value))
  dispatch(emailsave(emailRef.current.value))
dispatch(ForgotPassword({
  otp:genOtp,
  email:emailRef.current.value
}))
}
}

  return (
    <>
      <div className=" absolute top-[32%] sm:left-[35%] left-[18%] sm:w-[25%] sm:h-[24%] w-[60%] h-[38%] rounded-md shadow-lg bg-zinc-300">
        <div className="font-semibold m-2">Forgot Password</div>

        <div className="font-serif ml-[12%] mt-4">Email</div>
        <label id="reset">
          <input
          ref={emailRef}
            id="reset"
            placeholder="Enter Email"
            className="w-[70%] ml-[10%] h-8 p-2 m-1 text-gray-900 dark:text-white focus:outline-none border-2 "
          />
        </label>

        {
          resetEmaiValidation.status=="success"?
          <Link to="/OTP-verify"><button className="font-bold bg-teal-300 rounded-md w-[20%] ml-[34%] mt-4" onClick={()=>handleSend(4)}>
          Send
        </button></Link>
          :
          <button className="font-bold bg-teal-500 rounded-md w-[20%] ml-[34%] mt-4" onClick={()=>handleSend(4)}>
          Send
        </button>}
      </div>
    </>
  );
};

export default ResetPassword;
