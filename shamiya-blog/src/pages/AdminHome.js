import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
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

    const handleChange = (event) => {
        setBookOrFilm(event.target.value);
    };

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

    // fetch('http://localhost:3002/posts')
    //     .then((res) => { return (res.json()) })
    //     .then((data) => {
    //         let postData = "";
    //         data.map((values) => {
    //             postData += `<div className="m-auto p-[10px] border-solid border-2 h-auto w-[95%] md:w-[95%] lg:max-w-[85%] flex flex-col ">
    //             <span className="flex flex-row justify-between px-[25px]">
    //                 <p className="">${values.data} </p>
    //                 <p className="">${values.title} </p>
    //             </span>
    //             <p className="text-center text-[2rem]">Picture</p>
    //             <p className="text-center">${values.postMessage} </p>
    //             <p className="text-end">${values.tags} </p>
    //         </div>`
    //         })
    //         document.getElementById("postsSection").innerHTML = postData;
    //     })


const addPost = async (e) => {
    try {
        e.preventDefault();
        const formData = {
            postMessage: post,
            title: postTitle,
            date: Date(),
            tags: tags,
            type: bookOrFilm,
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
    } catch (err) {
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
                    <header className="text-center">Create New Post</header>
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
                    </div>
                    <br />
                    <button type="submit" className="border-solid border-4 border-black-300 rounded-lg shadow-md text-center">Post</button>
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