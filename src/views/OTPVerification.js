import React, { useEffect, useRef, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ForgotPassword } from "../Utils/authSlice";
import { useDispatch,useSelector } from "react-redux";

const OTPVerification = () => {
  const navigate=useNavigate()
  useEffect(() => {
    otpRef.current[0].focus();
  }, []);
  const [timer,setTimer]=useState()
 const [disable,Setdisable]=useState(false)
 const [isVerifyVisible,SetisVerifyVisible]=useState(false)
  const [OTP, SetOTP] = useState([]);
  const dispatch=useDispatch()
  const otpRef = useRef([]);
  const savedEmail=useSelector(store=>store.auth.email)
  const otpStatus= useSelector(store=>store.auth.reset)
  const handleVerify = () => {
    const finalOTP =
      otpRef.current[0].value +
      otpRef.current[1].value +
      otpRef.current[2].value +
      otpRef.current[3].value;
     
if(finalOTP.length!=4 || isNaN(finalOTP)) return
console.log(finalOTP, "finalOyp");
    if(finalOTP==otpStatus.otp){
     SetisVerifyVisible(true)
    }

  };
 

  const handleinput = (index) => {
    console.log(index, "index");
  };

  const handlechange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    if (value && index < 4 && otpRef.current[index + 1]) {
      otpRef.current[index + 1].focus();
    }

    // if(index>0&& !OTP[index-1]){
    //   otpRef.current[OTP.indexOf("")].focus()
    // }
  };

  useEffect(()=>{
   if(disable==true){
      const countdown=setInterval(()=>{
        setTimer((timer)=>timer-1)
       },1000)
    
   
    setTimeout(()=>{
      clearInterval(countdown)
      Setdisable(false)
    },60000)
  }
  },[disable])

  const handleResendOTP=(e,otpLength)=>{
  e.stopPropagation()
setTimer(60)
Setdisable(true)
 let otp=""
const characters = '0123456789'
function generateOTP(){
for(let i=1;i<=otpLength;i++){
 otp += characters.charAt(Math.floor(Math.random()*10))
}
return otp 
}
const genOtp=generateOTP()
console.log(savedEmail,"saved");
dispatch(ForgotPassword({
  email:savedEmail,
  otp:genOtp
}))


  }

  return (
    <div className=" absolute top-[32%] sm:left-[35%] left-[18%] sm:w-[25%] sm:h-[28%] w-[78%] h-[42%] rounded-md shadow-xl bg-zinc-100">
      <div className=" absolute left-[28%] font-bold m-2 sm:text-xl text-sm">
        Email Verification
      </div>

      <div className="sm:font-mono font-thin text-sm sm:ml-[10%] ml-1 sm:mt-[9%] mt-8 text-center">
        `we have sent a otp on your email {savedEmail} `
      </div>

      <div className="flex justify-evenly mt-[6%]  ">
        {Array(4)
          .fill("")
          .map((i, index) => {
            return (
              <label>
                <input
                  ref={(input) => (otpRef.current[index] = input)}
                  id={index}
                  type="text"
                  maxLength="1"
                  onClick={() => handleinput(index)}
                  onChange={(e) => handlechange(e, index)}
                  className="w-12 h-12 p-4 text-xl dark:text-white focus:outline-none  focus:ring focus:ring-violet-300 border-2 "
                />
              </label>
            );
          })}
      </div>

    <button
        className="font-bold bg-blue-500 rounded-md sm:w-[30%] w-32 sm:ml-[34%] ml-[18%] mt-6 hover:bg-teal-500"
        onClick={handleVerify}
      >
        Verify account
      </button>
      <div className="text-sm ml-[19%] mt-2">
        Didn't received otp?{" "}
        <span className={`font-bold text-blue-500 ${disable?"cursor-not-allowed":"cursor-pointer"}`} onClick={(e)=>handleResendOTP(e,4)}>{disable?null:"Resend OTP"} </span>
        <span className="text-blue-500">
          {
            timer>0?`00:${timer.length==1?`0${timer}`:timer}`:null
          }
          </span>
      </div>
      {isVerifyVisible?navigate('/New-Password'):null}
    </div>
  );
};

export default OTPVerification;
