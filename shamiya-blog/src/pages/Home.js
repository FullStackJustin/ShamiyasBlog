import React from 'react';
import { Link } from 'react-router-dom';
import miyaLogo from "../assets/miyaLogo.png"
import { auth } from '../firebase';
import "../styles/home.css"



const Home = () => {
    console.log(auth.currentUser)

    return (
        <section className=" flex flex-col lg:flex-row md:flex-row relative mx-auto mt-[5px] mb-[5px] w-[99vw] h-[screen5] overflow-y-scroll h-[98vh] bg-[#A0A694]">
            <div className=" relative flex m-auto justify-center h-[60%] py-10 items-center flex-auto max-w-[50vw]">
                <img src={miyaLogo} alt="Your Logo" className="w-[50vw] max-w-[50vw] lg:w-[35vw] "></img>
            </div>
            <div className="flex mx-auto justify-center items-center flex-auto max-w-[50vw]">
                <div className=" flex flex-col justify-between w-[60vw] md:w-[35%] lg:w-[30%] h-[75vh] md:h-[50%] lg:max-h-[70%] bg-[#FBFAF9] pt-[10px] rounded-lg shadow-xl font-[montseratt] ">
                    <Link to="/about" className="      PFCursor w-[95%] hover:bg-green-100 text-xl lg:text-md w-[95%] rounded-lg shadow-md text-center py-[10px] mx-auto ">About Me</Link>
                    <Link to="/bookreviews" className="PFCursor w-[95%] hover:bg-green-100 text-xl lg:text-md w-[95%] rounded-lg shadow-md text-center py-[10px] mx-auto ">Book Reviews</Link>
                    <Link to="/filmreviews" className="PFCursor w-[95%] hover:bg-green-100 text-xl lg:text-md w-[95%] rounded-lg shadow-md text-center py-[10px] mx-auto ">Film Reviews</Link>
                    <div className="flex flex-row justify-center w-[80%] justify-between items-center mx-auto pb-[15px] h-10 ">
                        <a href="" target="_blank"> <i className="PFCursor fa-brands fa-xl fa-instagram"/></a>&nbsp;
                        <a href="" target="_blank"><i className="PFCursor fa-brands fa-xl fa-linkedin"/></a> &nbsp;
                        <a href="" target="_blank"><i className="PFCursor fa-solid fa-xl fa-podcast"/></a> 
                    </div>
                </div>
            </div>
            <Link to="/adminlogin" className="PFCursor absolute right-[5px] h-[25px] w-auto" >Admin Login</Link>
        </section>
    )


}


export default Home;