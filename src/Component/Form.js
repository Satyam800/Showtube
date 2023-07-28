import React, { useEffect, useState } from "react";

const Form = () => {
  const [form, setform] = useState({});
  const [Data, SetData] = useState([]);
  const [value,Setvalue]= useState(false)
  const handleform = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const response = await fetch("http://localhost:2000/data", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    console.log(result);
    Setvalue(true)
  };

  const getData = async () => {
    let data = await fetch("http://localhost:2000/getdata", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
    });
    let finaldata = await data.json();
    SetData(...finaldata);
    console.log(finaldata);
    Setvalue(false)
  };

  useEffect(() => {
    console.log(form, "form");
    getData();
  }, [value]);
  

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>Usename</span>
        <input
          placeholder="username"
          name="username"
          type="text"
          onChange={handleform}
        />
        <span>Password</span>
        <input
          placeholder="passowrd"
          name="password"
          type="text"
          onChange={handleform}
        />
        <input type="submit"></input>
      </form>
    </>
  );
};

export default Form;
