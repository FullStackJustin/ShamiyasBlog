import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import "../styles/login.css"

const AdminLogin = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("");
    const navigate = useNavigate();
    const { logIn } = UserAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('')
        const user = getAuth();

        if (!user.currentUser){
            try {
                await logIn(email, password)
                navigate('/adminhome')
                console.log("sccuessfully signed in")
            } catch (err) {
                setError(err.message)
                console.log(error + "Something went Wrong")
            }
        } else {
            navigate('/adminHome')
        }
    }
    const [showPassword, setShowPassword] = useState(false);
  
    
    return(
    <div className="relative m-auto max-w-[99vw] max-h-[100vh] h-[100vh] bg-[#A0A694]">
        <br/> <br/> <br/>
            <div className="relative max-w-[700px] mx-auto border rounded-xl p-4 ">
                <div>
                    <h1 className="text-center text-2xl font-bold py-2"> Sign In</h1>
                </div>
                <form onSubmit={handleSignIn}>
                    <div className="flex flex-col py-2">
                        <label className="text-center py-2 font-medium">Email Address</label>
                        <input className="text-center border p-3" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email Address"></input>
                    </div>
                    <div className="flex flex-col py-2">
      <label className="py-2 font-medium text-center">Password</label>
      <div className="relative">
        <input
          className="text-center border p-3 w-[100%] "
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Your password"
          value={password}
        />
        <button
          className="absolute right-0 top-0 mt-3 mr-2"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}
        </button>
      </div>
    </div>
                    <button type="submit" className="PFCursor border rounded-md border-blue-500 bg-blue-600 hover:bg-green-500 w-full p-4 my-2 text-white">Log In</button>
                </form>
            </div>
        </div>
    )


}


export default AdminLogin;