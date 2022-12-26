import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const auth = getAuth();

const AdminHome = () => {
    const [admin, setAdmin] = useState("")

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user)
            setAdmin(user)
        } 
    });

    return(
        <section className="h-[100vh] w-[100vw]flex flex-col ">
            <div className="">
                <header className="text-left pl-[5vw] pt-[2vh] ">{admin?.displayName}</header>
            </div>
            <div className="">
                <p>Body</p>
            </div>
        </section>
    )
}


export default AdminHome;