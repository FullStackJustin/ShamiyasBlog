import React from 'react';
import { Link } from 'react-router-dom';
import urLogoHere from "../assets/urLogoHere.png"

const Home = () => {

    return (
        <section className="flex flex-col lg:flex-row md:flex-row relative mx-auto mt-[0px] mb-[0px] w-[99vw] h-[screen5] overflow-y-scroll h-[100vh] bg-[#A0A694]">
            <div className=" relative flex m-auto justify-center h-[60%] py-10 items-center flex-auto w-[50%]">
                <img src={urLogoHere} alt="Your Logo" className="w-[30%] max-w-[30%] md:max-w-[45%] pb-[10px] "></img>
                <div>
                    <p className="text-center text-2xl font-bold">(Your Blog Name)</p>
                    <br/>
                </div>
                    <p className=" absolute top-[65%] md:bottom-[99%] m-[10px] text-sm md:text-md lg:text-lg">description or slogan or something</p>
            </div>
            <div className="flex mx-auto justify-center items-center flex-auto w-[50%]">
                <div className=" flex flex-col justify-between h-[90vh] lg:max-h-[70%] md:max-h-[70%] bg-[#D2D4D9] pt-[10px] rounded-lg ">
                    <Link to="/" className="w-[95%] text-xl lg:text-sm w-[95%] border-double border-4 border-neutral-400 rounded-lg shadow-xl text-center py-[10px] mx-auto ">About Me</Link>
                    <Link to="/" className="w-[95%] text-xl lg:text-sm w-[95%] border-double border-4 border-neutral-400 rounded-lg shadow-xl text-center py-[10px] mx-auto ">Book Reviews</Link>
                    <Link to="/" className="w-[95%] text-xl lg:text-sm w-[95%] border-double border-4 border-neutral-400 rounded-lg shadow-xl text-center py-[10px] mx-auto ">Movie & Show Reviews</Link>
                    <Link to="/" className="w-[95%] text-xl lg:text-sm w-[95%] border-double border-4 border-neutral-400 rounded-lg shadow-xl text-center py-[10px] mx-auto ">My Podcasts</Link>
                    <div className="flex flex-row justify-center w-[100%] max-w-[40%] justify-between items-center mx-auto pb-[15px] h-10 ">
                        <i class="fa-brands fa-xl fa-instagram"></i>
                        <i class="fa-brands fa-xl fa-linkedin"></i>
                        <i class="fa-solid fa-xl fa-podcast"></i>
                    </div>
                </div>
            </div>
        </section>
    )


}


export default Home;