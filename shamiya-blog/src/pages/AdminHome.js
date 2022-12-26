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
                <header className="text-left pl-[5vw] pt-[2vh] "> Welcome back {admin?.displayName} 🙂</header>
            </div>
            <div className="rounded-md shadow-lg m-auto h-[85vh] md:h-[85vh] lg:h-[85vh] bg-[#A0A694] max-w-[90vw] w-[90vw]  ">
                <section>
                    <header>Admin Home Body</header>
                </section>
            </div>
        </section>
    )
}


export default AdminHome;