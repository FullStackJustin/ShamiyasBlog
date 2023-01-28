import { useState } from "react";
import "../styles/about.css";

const AboutMe = () => {
    const [dropMenuOpen, setDropMenuOpen] = useState(false);

    return(
        <section className="h-[100vh] w-[100vw] flex flex-col text-center bg-[#A0A694]">
            <div className={"absolute burgerMenu inlineBlock top-[1.75rem] left-[1.5rem] "}>
                <button onClick={()=>setDropMenuOpen(true)} className="text-white fa-solid fa-xl fa-bars"></button>
                <div className={"absolute ml-[2.5vw] transition-[width] overflow-hidden ease-in-out duration-700 left-0 top-0 z-10 bg-gray-500 rounded-full py-[1em]  " + (dropMenuOpen ? "w-[185px]  " : "w-0" )}>
                    <a href="/" className="mx-[5px] text-center text-clip overflow-hidden hover:text-white block">Home</a>
                    <a href="/bookreviews" className="mx-[5px] text-center my-[.25em] text-clip hover:text-white block">Book&nbsp;Reviews</a>
                    <a href="/filmreviews" className="mx-[5px] my-[.25em] text-center text-clip overflow-hidden hover:text-white block">Film&nbsp;Reviews</a>
                    <hr className="w-[75%] mx-auto my-[.5em] "/>
                    <button onClick={()=>setDropMenuOpen(false)} className="px-[5px] text-clip overflow-hidden text-center w-full hover:text-white block">Close</button>
                </div>
            </div>
            <header className=" text-white text-[1.5em] font-[montseratt] mt-[25px]">About Me</header>
           <div className="rounded-md shadow-lg m-auto h-[85vh] md:h-[85vh] lg:h-[85vh] bg-[#FBFAF9] max-w-[90vw] w-[90vw]  ">
           </div>
        </section>
    )


}


export default AboutMe;