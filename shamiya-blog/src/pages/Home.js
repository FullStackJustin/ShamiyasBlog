import React from 'react';
import { Link } from 'react-router-dom';
import urLogoHere from "../assets/urLogoHere.png"
import { auth } from '../firebase';
import "./home.css"


const Home = () => {
    console.log(auth.currentUser)

    return (
        <section className="cursor-sparkle flex flex-col lg:flex-row md:flex-row relative mx-auto mt-[5px] mb-[5px] w-[99vw] h-[screen5] overflow-y-scroll h-[98vh] bg-[#CCCFC0]">
            <div className=" relative flex m-auto justify-center h-[60%] py-10 items-center flex-auto max-w-[50%]">
                <img src={urLogoHere} alt="Your Logo" className="w-[40%] max-w-[40%] md:max-w-[45%] pb-[10px] "></img>
                <div>
                    <p className="text-center text-5xl md:text-7xl lg:text-8xl font-[willow-std] ">(Your Blog Name)</p>
                    <br/>
                </div>
                    <p className=" absolute top-[65%] md:bottom-[99%] m-[10px] text-sm md:text-md lg:text-lg">description or slogan or something</p>
            </div>
            <div className="flex mx-auto justify-center items-center flex-auto max-w-[80%]">
                <div className=" flex flex-col justify-between w-[75%] sm:w-[100%] md:w-[80%] lg:w-[85%] h-[90vh] lg:max-h-[70%] md:max-h-[70%] bg-green-50 pt-[10px] rounded-lg ">
                    <Link to="/about" className="w-[95%] hover:bg-white text-xl lg:text-sm w-[95%] border-double border-4 border-neutral-400 rounded-lg shadow-xl text-center py-[10px] mx-auto ">About Me</Link>
                    <Link to="/bookreviews" className="w-[95%] hover:bg-white text-xl lg:text-sm w-[95%] border-double border-4 border-neutral-400 rounded-lg shadow-xl text-center py-[10px] mx-auto ">Book Reviews</Link>
                    <Link to="/filmreviews" className="w-[95%] hover:bg-white text-xl lg:text-sm w-[95%] border-double border-4 border-neutral-400 rounded-lg shadow-xl text-center py-[10px] mx-auto ">Film Reviews</Link>
                    <div className="flex flex-row justify-center w-[100%] max-w-[40%] justify-between items-center mx-auto pb-[15px] h-10 ">
                        <i className="fa-brands fa-xl fa-instagram"/>
                        <i className="fa-brands fa-xl fa-linkedin"/>
                        <i className="fa-solid fa-xl fa-podcast"/>
                    </div>
                </div>
            </div>
            <a href="/adminlogin" className="absolute right-[5px] h-[25px] w-auto" >Admin Login</a>
        </section>
    )


}


export default Home;