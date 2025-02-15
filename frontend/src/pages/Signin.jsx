import React from 'react'
import Heading from '../components/Heading'
import Sub_Heading from '../components/Sub_Heading'
import Input_Box from '../components/Input_Box'
import Button from '../components/Button'
import Button_Warning from '../components/Button_Warning'

const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"SignIn"}></Heading>
          <Sub_Heading label={"Puchu Signin"}></Sub_Heading>
          <Input_Box label={"Email"} placeholder={"santahoho@gmail.com"}></Input_Box>
          <Input_Box label={"Password"} placeholder={"789456"}></Input_Box>
          <div className='pt-4'>
           <Button label={"SignIn"}></Button>
          </div>
          <Button_Warning label={"No account??"} buttonText={"Signup"} to={"/signup"}></Button_Warning>
        </div>
      </div>
    </div>
  )
}

export default Signin