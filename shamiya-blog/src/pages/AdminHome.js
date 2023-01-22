import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { auth, storage } from "../firebase";
// import {collection, addDoc} from 'firebase/firestore';

const authentication = getAuth();

const AdminHome = () => {
    const displayPosts = () => {
        fetch('https://miya-blog-backend.onrender.com/posts/all', {
            headers: {
                method: 'GET',
            }
        })
            .then((res) => { return res.json() })
            .then((data) => {
                let postData = "";
                data.map((values) => {
                    return postData += `<div class="m-auto p-[10px] rounded-lg bg-[#D2D4D9] mb-[15px] h-auto w-[95%] md:w-[95%] lg:max-w-[85%] flex flex-col ">
                    <span class="flex flex-row justify-between px-[25px]">
                    <p class="py-[15px]">${values.date} </p>
                    <p class="py-[15px]">${values.title} </p>
                    </span>
                    <img src="${values.image}" alt="Sorry, Image Failed To upload" class="m-auto w-[90%] h-[10em] object-fill py-[15px] "/>
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

    //Start - state variables for html inputs
    const [admin, setAdmin] = useState("");
    const [tags, setTags] = useState("");
    const [post, setPost] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [bookOrFilm, setBookOrFilm] = useState("");

    const handleChange = (event) => {
        setBookOrFilm(event.target.value);
    };
    const handleTags = (e) => {
        let value = e.target.value;
        if (!value.startsWith("#")) {
          value = "#" + value;
        }
        if (value.includes(" ")) {
          value = value.replace(/ /g, ", #"); // replace all spaces with hashtags
        }
        setTags(value);
      }

      const handleTagInput = (e) => {
        let value = e.target.value;
        value = value.replace(/#/g, ""); // remove all hashtags
        e.target.value = value;
      }
    //End


    //START - Logout function for logout button
    const handleLogOut = async (e) => {
        e.preventDefault();
        signOut(auth);
    }
    // END - Logout function for logout button

    // START - Get the current user data on mount and unmount when user is logged out
    const unsubscribeRef = useRef(null);
    useEffect(() => {
        unsubscribeRef.current =
            onAuthStateChanged(authentication, (user) => {
                if (user) {
                    setAdmin(user)
                }
            });
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current()
            }
        };
    }, [])
    //END - Get the current user data on mount and unmount when user is logged out

    // Start - Function and Api calls for displaying posts
    //End - Function and Api calls for displaying posts

    // Save image input to state variable
    const [uploadImg, setUploadImg] = useState(null)
    const addImg = (e) => {
        const file = e.target.files[0];
        setUploadImg(file)
    }
    const [imgUrl, setImgUrl] = useState("");

    //Add post function to post frontend inputs to backend
    const addPost = async (e) => {
        e.preventDefault();
        if (uploadImg == null) console.log("No Picture Uploaded");
        const imgRef = ref(storage, `/images${uploadImg.name}`);
        uploadBytes(imgRef, uploadImg).then( async (snapshot) => {
            const url = await getDownloadURL(snapshot.ref)
                setImgUrl(url);
                alert("Your Post has Uploaded")
        })
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        try {
            const formData = {
                postMessage: post,
                title: postTitle,
                date: formattedDate,
                tags: tags,
                type: bookOrFilm,
                image: imgUrl,
            }
            await fetch('https://miya-blog-backend.onrender.com/posts', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then((res) => console.log("success"))
        } catch (err) {
            console.log(err);
        }
    }
    // END - Function and method for sending post data to backend

    // Delete Posts Function 
    const [titleToDelete, setTitleToDelete] = useState("");
    const deletePost = async () => {
        try{
            const id = {id : titleToDelete};
            await fetch('https://miya-blog-backend.onrender.com/posts', {
                method: 'DELETE',
                body: JSON.stringify(id),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                if(res.ok){
                    return;
                } else {
                    console.log("There was a problem deleting post")
                }
            })
        } catch(err){
            console.log(err)
        }
    }
    displayPosts();
    

    return (
        <>  
            {/* Top Navbar */}
            <div className="max-w-[95vw] text-[20%] md:text-[1em] lg:text-[1.5em] md:w-[95vw] lg:w-[95vw] px-[5vw] flex flex-row justify-between m-auto">
                <a href="/"><p className="text-left pt-[1.5vh] border-solid border-2  border-black-600 bg-[#A0A694] hover:bg-white rounded-md p-[5px] m-[5px] "> Welcome back {admin?.displayName} 🙂</p></a>
                <a href="/account" className="border-solid border-2  border-black-600 bg-[#A0A694] hover:bg-white rounded-md p-[5px] m-[5px]">Edit Account</a>
                <button onClick={handleLogOut} className="border-solid border-2  border-black-600 bg-[#A0A694] hover:bg-white rounded-md p-[5px] m-[5px]">Sign Out</button>
            </div>

            {/* Main Page's Content */}
            <div className="rounded-md shadow-lg my-[0px] mx-auto h-min md:h-min lg:h-auto bg-[#A0A694] max-w-[95vw] w-[95vw] flex flex-col md:flex-row lg:flex-row ">
                <section className=" pb-[10px] mx-auto w-[100%] md:w-[50%] lg:w-[50%] h-auto md:h-[50vh] lg:h-[45vh] ">
                    <form onSubmit={addPost} className="flex flex-col p-[15px] ">
                        <header className="text-center py-[10px] ">Create New Post</header>
                        <input className="rounded-lg max-h-[75vh] " type="text" placeholder="Type Your Post's Title Here" onChange={(e) => setPostTitle(e.target.value)}></input>
                        <br />
                        <input className="rounded-lg" type="text" placeholder="Type Your Post Here" onChange={(e) => setPost(e.target.value)}></input>
                        <br />
                        <input className="rounded-lg" type="text" placeholder="Type Your Tags Here" onChange={handleTags} onInput={handleTagInput} ></input>
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
                            <input type="file" accept="image/*" className="w-[25%] md:w-[40%] lg:w-[45%] " onChange={addImg} />
                        </div>
                        <br />
                        <span className="flex flex-row justify-around">
                            <button type="submit" className="bg-[#D2D4D9] hover:bg-white  w-[45%] rounded-lg shadow-md text-center">Post</button>
                            <button type="reset" className="bg-[#D2D4D9]  hover:bg-white w-[45%] rounded-lg shadow-md text-center">Reset Form</button>
                        </span>
                    </form>
                    <form onSubmit={deletePost} className="text-center bg-[#A0A694]">
                        <label className="flex flex-col py-[5px]">
                            Want to delete a post?
                            <input onChange={(e) => setTitleToDelete(e.target.value)} className="whitespace-pre-wrap h-auto w-[95%] rounded-lg mx-auto my-[5px]" type="text" placeholder="Type in the post's title that you want to delete exactly as it is written on the post"/>
                        </label>
                        <button type="submit">Delete Post</button>
                    </form>
                </section>
                <section className="py-[10px] w-[100%] md:w-[50%] lg:w-[50%] h-auto md:h-auto lg:h-auto ">
                    <div id="postsSection">
                    </div>
                </section>
            </div>
        </>
    )
}


export default AdminHome;