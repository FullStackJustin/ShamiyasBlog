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
// #A0A694
    return(
        <section className="m-auto flex flex-col md:flex-row lg:flex-row h-[100vh] w-[98vw] ">
            <div id="postsSection" className="overflow-y-scroll m-auto py-[15px] w-[100%] md:h-[95%] lg:h-[95%] h-[90%] bg-[#FBFAF9] rounded-lg ">
            </div>
            <a href="/"><i className="fa-solid fa-xl fa-arrow-left absolute md:absolute left-[15px] md:left-[20px] lg:left-[20px] top-[17px] md:top-[30px] lg:top-[30px] z-[50] "></i></a>
            <div className="w-[100%] md:w-[40%] lg:w-[40%] h-[5vh] absolute  md:relative lg:relative xl:relative m-auto ">
                <p className="text-center text-white mt-[5px] font-[montseratt] text-[1.5em] ">Film & TV</p>
            </div>
        </section>
    )


}


export default FilmReviews;