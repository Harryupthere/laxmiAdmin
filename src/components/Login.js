import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginImage from "../image/loginImage.svg";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Login() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(0);
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });

  const toggleTab = (index) => {
    setToggle(index);
  };

  const handleChange = (e) => {
    setFormError({ email: "", password: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login=async(e)=>{
e.preventDefault();
try{
  let eError="";
  let pErorr="";
if(form.email==''){
  eError="email required"
}
if(form.email==''){
  pErorr="password required"
}

setFormError({email:eError,password:pErorr})

if(pErorr!="" || eError!=""){
  return
}
console.log(`${config.apiUrl}login`)
const response = await axios.post(`${config.apiUrl}/login`, {
 email:form.email,
 password:form.password
});

if(response.data.success){
alert(response.data.message)
document.cookie = "loginStatus=true;path=/"; // Adjust path as necessary

        // Redirect to dashboard page
        navigate('/Dashboard/home');
}else{
  alert(response.data.message)

} // handle response data as needed

}catch(error){
  console.log(error)
}
  }

  return (
    <>
      <Toaster />

      <div className="bg-center w-screen m-auto px-3 pt-20 pb-12 lg:block xl:px-0 ">
        <div className="lg:grid max-w-7xl mx-auto  grid-cols-1  md:grid-cols-2  flex flex-col flex-col-reverse  PageBG rounded-xl shadow-2xl">
          <div className=" lg:rounded-br-none rounded-br-xl  lg:rounded-tl-xl  rounded-tl-none  rounded-bl-xl py-10 sm:py-12    flex  justify-center items-center flex-col  px-4 sm:px-20  md:px-36  lg:px-12 xl:px-24 bg-transparent ">
            <div className="  rounded-xl     flex  justify-center items-center flex-col w-full  ">
              <div className="my-4 w-full text-center">
                <h1 className="sm:text-3xl text-2xl  md:text-4xl font-bold text-gray-50">
                  Hi, Welcome back
                </h1>
              </div>

              <div className="my-4  w-full text-center">
                <h1 className="sm:text-lg text-sm text-gray-100">
                  Sign in with Email address
                </h1>
              </div>
              <div className="relative w-full min-w-[200px] h-16 my-4">
                <input
                  type="email"
                  className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0  transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                  placeholder=" "
                  name="email"
                  value={form.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                <label className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight   transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all  peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Email
                </label>
              </div>
              <span style={{ color: "red" }}>{formError.email}</span>
              <div className="relative w-full min-w-[200px] h-16 my-4 flex justify-between items-center ">
                <input
                  type={toggle === 1 ? "text " : "password"}
                  className="peer w-full h-full text-white border-t-transparent bg-transparent text-blue-gray-100 font-sans font-normal outline outline-0 focus:outline-0  transition-all placeholder-shown:border placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-100 border focus:border-2  focus:border-t-transparent text-md px-3 py-3 rounded-md border-gray-100 focus:border-blue-500"
                  placeholder=" "
                  name="password"
                  value={form.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <button className="absolute right-5 text-white">
                  {toggle === 1 ? (
                    <VisibilityIcon onClick={() => toggleTab(0)} />
                  ) : (
                    <VisibilityOffIcon onClick={() => toggleTab(1)} />
                  )}
                </button>
                <label className="flex text-white w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-100 leading-tight peer-focus:leading-tight   transition-all -top-1.5 peer-placeholder-shown:text-[18px] text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all  peer-placeholder-shown:leading-[4.1] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
                  Password
                </label>
              </div>
              <span style={{ color: "red" }}>{formError.password}</span>
              <div className="-ml-2.5 w-full my-4">
                <div className=" flex justify-between items-center">
                  <div className="flex justify-center items-center">
                    <label
                      className="relative flex items-center cursor-pointer p-3 rounded-full"
                      for="checkbox"
                    >
                      <input
                        type="checkbox"
                        className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-blue-500 checked:border-blue-500 checked:before:bg-blue-500"
                        id="checkbox"
                        //onClick={handleCheck()}
                      />
                      <div className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="1"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </label>
                    <label
                      className="text-gray-100 font-light select-none cursor-pointer mt-px sm:text-lg text-sm"
                      for="checkbox"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className=" sm:text-lg text-sm text-white">
                    <Link to="/forgotPassword">Forgot Password? </Link>
                  </div>
                </div>
              </div>

              <div className=" pt-0 w-full my-3">
                  <button
                    className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-lg text-sm py-3 px-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                    type="button"
                    onClick={e=>{login(e)}}
                  >
                    Sign In
                  </button>

                {/* <p className="antialiased font-sans text-md font-light leading-normal text-inherit mt-6 flex justify-end text-white">
                  Don't have an account?
                  <span className="block antialiased font-sans  leading-normal  text-gray-100 underline ml-1 font-bold cursor-pointer">
                    <Link to="/signUp">Signup </Link>
                  </span>
                </p> */}
              </div>
            </div>
          </div>

          <div className="  rounded-tr-xl  lg:rounded-tl-none rounded-tl-xl lg:rounded-br-xl  rounded-br-none  py-10 sm:py-12   lg:flex  justify-center items-center flex-col hidden space-x-4 ">
            <img src={loginImage} alt="pngImage" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
