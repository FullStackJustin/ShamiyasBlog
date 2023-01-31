import { useState } from "react";

const FilmReviews = () => {

    fetch("https://miya-blog-backend.onrender.com/posts/films",{
        method: 'GET',
    }).then((res) => res.json())
    .then((data) => {
        let postData = "";
        data.map((values) => {
            return postData += `<div class="m-auto p-[10px] rounded-lg bg-[#CCCFC0] mb-[15px] h-auto w-[95%] md:w-[95%] lg:max-w-[85%] flex flex-col font-[philospher] ">
            <span class="flex flex-row justify-end px-[25px]">
            <p class="py-[15px]">${values.date} </p>
            </span>
            <img src="${values.image}" alt="Sorry, Image Failed To upload" class="m-auto w-[90%] h-[10em] object-contain py-[15px] "/>
            <p class="py-[15px] w-[100%] text-center "> <strong> ${values.title} </strong> </p>
            <p class="text-center py-[15px] ">${values.postMessage} </p>
            <p class="text-end py-[15px] ">${values.tags} </p>
            </div>`
        })
        document.getElementById("postsSection").innerHTML = postData;
    })

    const [dropMenuOpen, setDropMenuOpen]= useState(false);

    return(
        <section className="m-auto flex flex-col md:flex-row items-center lg:flex-row h-[100vh] w-[98vw] ">
            <div id="postsSection" className="overflow-y-scroll m-auto py-[15px] w-[100%] md:h-[95%] lg:h-[95%] h-[90%] bg-[#FBFAF9] rounded-lg ">
            </div>
            <div className={"absolute burgerMenu inlineBlock top-[5px] md:top-[1.75rem] right-[1.5rem] "}>
                <button onClick={()=>setDropMenuOpen(true)} className="text-white fa-solid fa-xl fa-bars"></button>
                <div className={"absolute ml-[2.5vw] transition-[width] overflow-hidden ease-in-out duration-700 right-[100%] top-0 z-10 bg-gray-500 rounded-full py-[1em]  " + (dropMenuOpen ? "w-[185px]  " : "w-0" )}>
                    <a href="/" className="mx-[5px] text-center text-clip overflow-hidden hover:text-white block">Home</a>
                    <a href="/about" className="mx-[5px] text-center my-[.25em] text-clip hover:text-white block">About&nbsp;Me</a>
                    <a href="/bookreviews" className="mx-[5px] my-[.25em] text-center text-clip overflow-hidden hover:text-white block">Book&nbsp;Reviews</a>
                    <hr className="w-[75%] mx-auto my-[.5em] "/>
                    <button onClick={()=>setDropMenuOpen(false)} className="px-[5px] text-clip overflow-hidden text-center w-full hover:text-white block">Close</button>
                </div>
            </div>
            <div className="w-fit mx-auto md:w-[40%] lg:w-[40%] h-[5vh] absolute  md:relative lg:relative xl:relative my-auto ">
                <p className="text-center text-white w-fit mx-auto font-[montseratt] text-[1.5em] ">Film&nbsp;&&nbsp;TV</p>
            </div>
        </section>
    )


}


export default FilmReviews;