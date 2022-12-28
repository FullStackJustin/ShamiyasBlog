import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
// import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
// import {collection, addDoc} from 'firebase/firestore';

const authentication = getAuth();

const AdminHome = () => {
    const [admin, setAdmin] = useState("");
    const [tags, setTags] = useState("");
    const [post, setPost] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const unsubscribeRef = useRef(null);
    const [bookOrFilm, setBookOrFilm] = useState("");
    const [imgEncoded, setImageEncoded] = useState("");

    const handleChange = (event) => {
        setBookOrFilm(event.target.value);
    };

    const encodedImg = (event) => {
        const file = event.target.files[0];
      }
      

    const handleLogOut = async (e) => {
        e.preventDefault();
        signOut(auth);
    }
    useEffect(() => {
        unsubscribeRef.current =
            onAuthStateChanged(authentication, (user) => {
                if (user) {
                    console.log(user)
                    setAdmin(user)
                }
            });
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current()
            }
        };
    }, [])
    
    const displayPosts = async() => {
        
        

    await fetch('http://localhost:3002/posts/all', {headers: {
        method: 'GET',
    }})
        .then((res) => { return res.json() })
        .then((data) => {
            console.log(data)
            let postData = "";
            data.map((values) => {
                return postData += `<div class="m-auto p-[10px] rounded-lg bg-[#D2D4D9] mb-[15px] h-auto w-[95%] md:w-[95%] lg:max-w-[85%] flex flex-col ">
                <span class="flex flex-row justify-between px-[25px]">
                    <p class="py-[15px]">${values.date} </p>
                    <p class="py-[15px]">${values.title} </p>
                    </span>
                    <img src=${imgEncoded} alt="Asta" class="w-[90%] h-[30]  py-[15px] "/>
                    <p class="text-center py-[15px] ">${values.postMessage} </p>
                    <p class="text-end py-[15px] ">${values.tags} </p>
                    </div>`
            })
            document.getElementById("postsSection").innerHTML = postData;
        }).catch((err) => {
            console.log(err);
        })
        
    }
    window.addEventListener("load", displayPosts);
    console.log(imgEncoded)
    
const addPost = async (e) => {
        
        const date = new Date();
        const month = date.getMonth()+1;
        const day = date.getDay();
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year}`
    try {
        const formData = {
            postMessage: post,
            title: postTitle,
            date: formattedDate,
            tags: tags,
            type: bookOrFilm,
            image: imgEncoded,
        }
        await fetch('http://localhost:3002/posts', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => console.log(res))
            .then((data) => {
                console.log(data);
            })
    } catch(err) {
        console.log(err);
    }
}   

return (
    <div className="h-[100vh] w-[100vw]flex flex-col ">
        <div className="max-w-[95vw] text-[20%] md:text-[1em] lg:text-[1.5em] md:w-[95vw] lg:w-[95vw] px-[5vw] flex flex-row justify-between m-auto">
            <p className="text-left pt-[1.5vh] border-solid border-2  border-black-600 bg-[#A0A694] hover:bg-white rounded-md p-[5px] m-[5px] "> Welcome back {admin?.displayName} 🙂</p>
            <a href="/account" className="border-solid border-2  border-black-600 bg-[#A0A694] hover:bg-white rounded-md p-[5px] m-[5px]">Edit Account</a>
            <button onClick={handleLogOut} className="border-solid border-2  border-black-600 bg-[#A0A694] hover:bg-white rounded-md p-[5px] m-[5px]">Sign Out</button>
        </div>
        <div className="rounded-md shadow-lg my-[0px] mx-auto h-auto md:h-auto lg:h-auto bg-[#A0A694] max-w-[95vw] w-[95vw] flex flex-col md:flex-row lg:flex-row ">
            <section className=" pb-[10px] mx-auto w-[100%] md:w-[50%] lg:w-[50%] h-[40vh] md:h-[50vh] lg:h-[45vh] ">
                <form onSubmit={addPost} className="flex flex-col p-[15px] ">
                    <header className="text-center py-[10px] ">Create New Post</header>
                    <input className="rounded-lg" type="text" placeholder="Type Your Post's Title Here" onChange={(e) => setPostTitle(e.target.value)}></input>
                    <br />
                    <input className="rounded-lg" type="text" placeholder="Type Your Post Here" onChange={(e) => setPost(e.target.value)}></input>
                    <br />
                    <input className="rounded-lg" type="text" placeholder="Type Your Tags Here" onChange={(e) => setTags(e.target.value)}></input>
                    <br />
                    <div className="flex flex-row justify-around">
                        <label>
                            <input type="radio" name="type" value="book" checked={bookOrFilm === 'book'} onChange={handleChange} />
                            Book
                        </label>
                        <label>
                            <input type="radio" name="type" value="film" checked={bookOrFilm === 'film'} onChange={handleChange} />
                            Film
                        </label>
                        <label>
                            <input type="file" accept="image/*" name="uploadImg" onChange={encodedImg} />
                            Post Image
                        </label>
                    </div>
                    <br />
                    <button type="submit" className="bg-[#D2D4D9] rounded-lg shadow-md text-center">Post</button>
                </form>
            </section>
            <section className="py-[10px] w-[100%] md:w-[50%] lg:w-[50%] h-auto md:h-auto lg:h-auto ">
                <div id="postsSection">
                </div>
            </section>
        </div>
    </div>
)
}


export default AdminHome;