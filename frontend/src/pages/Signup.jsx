import React, { useState } from 'react'
import Heading  from "../components/Heading"
import Sub_Heading from '../components/Sub_Heading'
import Input_Box from '../components/Input_Box'
import Button from '../components/Button'
import Button_Warning from '../components/Button_Warning'
import axios from  "axios"
import { useNavigate } from 'react-router-dom'


const Signup = () => {
  const [FirstName,setFirstName]=useState();
  const [LastName,setLastName]=useState();
  const [Email,setEmail]=useState();
  const [Password,setPassword]=useState();
  const navigate = useNavigate();  
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"SignUp"}/>
          <Sub_Heading label={"hohohohohogh signup"} ></Sub_Heading>
          
          <Input_Box onChange={(e)=>{
            setFirstName(e.target.value)
          }} label={"First Name"} placeholder={"Sanata"}></Input_Box>
          
          <Input_Box onChange={(e)=>{
            setLastName(e.target.value)
          }} label={"Last Name"} placeholder={"Claus"}></Input_Box>
          
          <Input_Box onChange={(e)=>{
            setEmail(e.target.value)
          }} label={"Email"} placeholder={"gjyhergfherukifh@124gmail.com"}></Input_Box>
          
          <Input_Box onChange={(e)=>{
            setPassword(e.target.value)
          }} label={"Password"} placeholder={"123456789"}></Input_Box>

          <div  className='pt-4'>
            <Button onClick={async ()=>{
              const  response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                firstName :FirstName,
                lastName :LastName,
                username :Email,
                password :Password,
              },)
            .then(response => console.log("Signup Success:", response.data))
            .catch(error => console.error("Signup Error:", error));
              // console.log(response);
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard");
            }} label={"Sign Up"}></Button>
          </div>
          
          <Button_Warning label = {"Big Guti??"} buttonText={"Guti Signin"} to={"/signin"}></Button_Warning>
          </div>
        </div>
    </div>
  )
}

export default Signup