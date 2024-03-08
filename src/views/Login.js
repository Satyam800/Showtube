import React,{useState,useRef, useEffect} from "react";
import { FaUser } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { CgPassword } from "react-icons/cg";
import Validate from '../Utils/Validate'
import { postUser,SignInUser } from "../Utils/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginState } from "../Utils/authSlice";
import ResetPassword from "./ResetPassword";
import { Link } from "react-router-dom";
const Login = () => {
  const [isSignUp,SetisSignUp]=useState(false)
  const [viewPassword,SetViewPassword]=useState(false)
  const [validateForm,SetValidateForm]=useState()
  const [loader,Setloader]=useState(false)
  const [reset,SetReset]=useState(false)
   const emailRef=useRef()
   const passwordRef=useRef()
   const userNameRef=useRef()
  const dispatch=useDispatch()
  const navigate=useNavigate()
const handleSignUp=()=>{
  SetisSignUp(!isSignUp)
}
const passwordView=()=>{
SetViewPassword(!viewPassword)
}
const signupMessage=useSelector(store=>store.auth.Signup)
const signInMessage=useSelector(store=>store.auth.Signin)
const [istoken,SetToken]=useState(" ")
useEffect(()=>{
   console.log(signupMessage,"jklkj");
  if(signupMessage?.success==true){
    localStorage.setItem("token",signupMessage.data.token)
    localStorage.setItem("id",JSON.stringify(signupMessage?.data?.response))
    navigate('/')
    
  }
},[signupMessage])

useEffect(()=>{
  if(signInMessage?.success==true){
    console.log(signInMessage,"nmnmnm");
    localStorage.setItem('token',signInMessage.data.token)
    localStorage.setItem("id",JSON.stringify(signInMessage?.data?.user))
    navigate("/")
  }
  dispatch(loginState(false))
},[signInMessage])

const handleLogin=()=>{
SetValidateForm(
  Validate(emailRef.current?.value)
)

if(validateForm) return


if(isSignUp){
  console.log(userNameRef.current?.value, emailRef.current?.value, passwordRef.current?.value);
dispatch(postUser({
  email:emailRef.current?.value,
  name:userNameRef.current?.value,
  password:passwordRef.current?.value
}))
console.log(signupMessage?.message,"kkk");

Setloader(true)

}
if(!isSignUp){
  dispatch(SignInUser({
    email:emailRef.current?.value,
    password:passwordRef.current?.value
  }))
}


}

const handlePassword=()=>{
  console.log("password") 
  SetReset(true)
}

  return (
    <div className=" absolute sm:top-[19%] sm:left-[25%] top-[20%] left-[6%] rounded-3xl shadow-2xl sm:w-[50%] sm:h-[50%] w-[90%] h-[60%] bg-slate-100 sm:flex ">
      <div className="sm:w-[50%] sm:h-[100%] w-[100%] h-[20%] bg-white   bg-gradient-to-r from-amber-100  to-neutral-200 rounded-3xl  ">
        <iframe
          className="sm:h-[94%] sm:w-[90%] h-[99%] w-[99%] "
          src="https://lottie.host/embed/1e102c0d-4dba-4d84-9068-77824376a03a/EuODmxT9OA.json"
        ></iframe>
      </div>
      <div className="bg-gradient-to-r from-rose-200 to-gray-200 sm:h-[100%] h-[90%] w-[96%]  sm:w-[90%]  rounded-3xl">
        <div className=" absolute top-[38%] sm:left-[45%] left-[4%] flex justify-baseline w-[60%] h-10 rounded-3xl  p-1">
          <AiTwotoneMail size={18} className="m-2"  />
          <label>
            <input
            ref={emailRef}
            type="email"
              placeholder="userId"
              className=" p-1 sm:w-56 w-32 rounded-3xl h-8 ml-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
            />
          </label>
          <div className="text-xl">{validateForm?"Inavlid Email":null}</div>
        </div>
        <div className=" absolute top-[58%] sm:left-[45%] left-[4%] flex justify-baseline w-[68%] sm:w-[60%] h-10 rounded-3xl  p-1">
          <RiLockPasswordFill size={18} className="m-2" />
          <label>
            <input
             ref={passwordRef}
            type={viewPassword?"text":"password"}
              placeholder="password"
              className=" p-1 sm:w-56 w-32 rounded-3xl  h-8 ml-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
            />
          </label>
          <CgPassword size={25} className="m-1 cursor-pointer" onClick={passwordView}/>
        </div>
         
        {
          isSignUp?
          <div className=" absolute top-[19%] sm:left-[45%] left-[4%] flex justify-baseline w-[60%] h-10 rounded-3xl  p-1">
          <FaUser size={18} className="m-2" />
          <label>
            <input
            ref={userNameRef}
              placeholder="userName"
              className=" p-1 sm:w-56 w-32 rounded-3xl h-8 ml-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
            />
          </label>
        </div>
          :null
        }

        <button className="absolute top-[75%] sm:left-[59%] left-[20%] w-28 h-8 bg-black text-white rounded-3xl" onClick={handleLogin}> {isSignUp? "SignUp":"Login"}</button>
        <div className="sm:w-[50%] w-[74%] ml-[7%] cursor-pointer absolute top-[90%] flex justify-between font-thin">
    <span className="cursor-pointer" onClick={handleSignUp}>{isSignUp?'SignIn':'SignUp'}</span>
<Link to='/reset'><span className="font-bold" onClick={handlePassword}>Forgot Password</span></Link>
  </div>
 
      </div>
    </div>
  )
};

export default Login;
