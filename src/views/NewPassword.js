import React, { useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import ForgotPassword from "./ResetPassword";
const NewPassword = () => {
  const dispatch=useDispatch()
  const oldPassRef = useRef();
  const NewPassRef = useRef();
  const savedEmail= localStorage.getItem("email")
  const handleSubmit = () => {
    console.log(savedEmail,"lk");
    dispatch(ForgotPassword({
      email:savedEmail,
      oldPass:oldPassRef.current?.value,
      NewPass: NewPassRef.current?.value
    }))
  };

  return (
    <div className="absolute top-[32%] sm:left-[35%] left-[18%] sm:w-[25%] sm:h-[33%] w-[60%] h-[42%] rounded-md shadow-xl bg-zinc-200">
      <div className="absolute ml-[22%] mt-[9%] w-[70%]">
        <div>old Password</div>
        <label>
          <input
            ref={oldPassRef}
            placeholder="Old password"
            type="password"
            className=" w-[70%] p-2 rounded-md text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
          />
        </label>

        <div className="mt-5">New Password</div>
        <label>
          <input
            ref={NewPassRef}
            placeholder="New password"
            type="password"
            className="w-[70%] p-2  rounded-md text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
          />
        </label>

        <button
          className="w-24 sm:ml-[20%]  ml-[12%] mt-8 h-8 rounded-md bg-black text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
