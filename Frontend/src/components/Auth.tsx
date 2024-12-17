import { ChangeEvent, useState } from "react";
import { SignupInput } from "@ajinkya66/medium-common";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


const Auth = ({type} : {type : "signup" | "signin"}) => {
  const navigate = useNavigate()
  const [postInputs,setPostInputs] = useState<SignupInput>({
    name:"",
    email:"",
    password:""
  })

 async function sendRequest(){
  try {
   const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs,
  {
    headers: {
      "Content-Type": "application/json",
    }
  }

   );
   console.log("from auth", response.data)
    const jwt = response.data;
    localStorage.setItem("token",jwt);
     navigate("/blogs");
  } catch (error) {
    
  }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
        <div className="px-10">
          <div className="text-3xl poppins-extrabold text-center">Create an account</div>
          <div className="text-md text-center text-gray-500 poppins-thin">
            {type === "signin" ? "Don't have an account ?" : "Already have an account ?"} <Link to={type === "signin" ? "/signup" : "/signin"  } className="underline hover:text-blue-800">{type === "signin" ? "Sign up" : "Sign in"  }</Link>
          
        </div>
          <div>
            { type === "signup" ? <LabelledInput label="Name" placeholder="John doe" type="" onChange={(e)=>{
              setPostInputs({
                ...postInputs,
                name : e.target.value,
              })
            }} ></LabelledInput> : null}
            <LabelledInput label="Email" placeholder="johndoe@gmail.com" type="" onChange={(e)=>{
              setPostInputs({
                ...postInputs,
                email : e.target.value,
              })
            }} ></LabelledInput>
            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
              setPostInputs({
                ...postInputs,
                password : e.target.value,
              })
            }} ></LabelledInput>
            <button onClick={sendRequest} type="button" className="text-white w-full mt-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign Up" : "Sign In" }</button>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Auth;


interface LabelledInputType{
  label : string,
  placeholder : string,
  onChange : (e : ChangeEvent<HTMLInputElement>) => void;
  type:string,
}
function LabelledInput({label,placeholder, onChange , type}:LabelledInputType){
  return <div className="mt-5">
    <label  className="block mb-2 text-sm font-medium text-black ">{label}</label>
    <input onChange={onChange} type={ type ||"text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5" placeholder={placeholder} required />
  </div>
}