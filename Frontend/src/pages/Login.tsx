import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import {useRecoilState} from 'recoil'
import { userState } from "../states/state";
import { user } from "../assets/questionCard/QuestionData";

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [LoggedInUserState,setLoggedInUserState] = useRecoilState<user>(userState)
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if(!email || !password){
      alert("All Fields are required!!")
      return 
    }
    // const user = new FormData();
    // user.append("email", email);
    // user.append("password", password);
    // console.log(user)
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Ensure JSON format
        },
        body: JSON.stringify({
          email: email,  // Match backend expectations
          password: password,
        }),
      })
      const data =await response.json()
      const LoggedInUser = data.data.user
      const token = data.data.accessToken
      localStorage.setItem("token", token)
      setLoggedInUserState(LoggedInUser)
      console.log(LoggedInUserState);
      alert(data.message)
      navigate('/')
    } catch (error) {
      console.log("Error: ", error);
      alert("Something went wrong, Please try again");
    }
  }
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-red-500 text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded">
              Login
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Link to='/signup' className="text-red-500">
                Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }
  