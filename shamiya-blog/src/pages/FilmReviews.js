const FilmReviews = () => {

    fetch("http://localhost:3002/posts/films",{
        method: 'GET',
    }).then((res) => res.json())
    .then((data) => {
        let postData = "";
        data.map((values) => {
            return postData += `<div class="m-auto p-[10px] rounded-lg bg-neutral-100 mb-[15px] h-auto w-[95%] md:w-[95%] lg:max-w-[85%] flex flex-col ">
            <span class="flex flex-row justify-between px-[25px]">
            <p class="py-[15px]">${values.date} </p>
            <p class="py-[15px]">${values.title} </p>
            </span>
            <img src="${values.image}" alt="Sorry, Image Failed To upload" class="m-auto w-[90%] h-[10em] object-contain py-[15px] "/>
            <p class="text-center py-[15px] ">${values.postMessage} </p>
            <p class="text-end py-[15px] ">${values.tags} </p>
            </div>`
        })
        document.getElementById("postsSection").innerHTML = postData;
    })

    return(
        <section className="m-auto flex flex-col md:flex-row lg:flex-row h-[100vh] w-[98vw] ">
            <div id="postsSection" className="overflow-y-scroll m-auto py-[15px] w-[100%] md:h-[95%] lg:h-[95%] h-[95%] bg-[#A0A694] rounded-lg ">
            </div>
            <div className="w-[100%] md:w-[40%] lg:w-[40%] h-[5vh] m-auto ">
            <a href="/"><i className="fa-solid fa-xl fa-arrow-left absolute md:absolute left-[10px] top-[17px] md:top-[20px] z-[50] "></i></a>
                <p className="text-center text-white ">Shamiya's Film Reviews</p>
            </div>
        </section>
    )


}


export default FilmReviews;