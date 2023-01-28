import { getAuth, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";




const Account = () => {

    const { logOut } = UserAuth();

    const handleLogout = async () => {
        try {
            await logOut()
            Navigate('/')
            console.log('logged out')
        }
        catch (err) {
            console.log(err)
        }
    };

    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleDisplayNameChange = (event) => {
        setDisplayName(event.target.value);
    };

    const handlePhotoURLChange = (event) => {
        setPhotoURL(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {

        const auth = getAuth();

        updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL
        }).then(() => {
            alert('Display name and photo URL updated successfully')

        }).then(Navigate('/adminhome'))
            .catch(function (error) {
                console.error(error);
            });

        if (email) {
            updateEmail(auth.currentUser, email).then(() => {
                console.log('Email updated successfully');
            }).catch((error) => {
                console.error(error);
            });
        }
        const newPassword = password;

        if (password) {
            updatePassword(auth.currentUser, newPassword).then(() => {
                console.log('Password updated successfully');
            }).catch((error) => {
                console.error(error);
            });
        }
    };

    return (
        <section className="h-[100vh] w-[100vw] bg-[#A0A694] flex flex-col justify-center">
            <div className="flex flex-row w-[60vw] mx-auto justify-around ">

                <a href="/adminhome" className="hover:text-white pt-[2vh] "><button>Back Home</button></a>
                <header              className="hover:text-white pt-[2vh] ">Update account</header>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off" className="border-double border-4 rounded-lg p-[15px] h-65vh md:max-h[60vh] mt-[10vh] mx-auto lg:max-h-[55%] w-[50vw] md:max-w-[55vw] lg:max-w-[60vw] ">
                <label htmlFor="displayName">
                    Display Name:
                    &nbsp; <input
                        className="m-auto rounded-lg shadow-md w-[60%] flex-end"
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={handleDisplayNameChange}
                    />
                </label>&nbsp;
                <br />
                <br />
                <label htmlFor="photoURL">
                    Photo URL:
                    &nbsp; <input
                        className="m-auto rounded-lg shadow-md w-[60%] flex-end"
                        type="text"
                        id="photoURL"
                        value={photoURL}
                        onChange={handlePhotoURLChange}
                    />
                </label>&nbsp;
                <br />
                <br />
                <label htmlFor="email">
                    Email:
                    &nbsp; <input
                        className="m-auto rounded-lg shadow-md w-[60%] flex-end"
                        autoComplete="new-password"
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Update Email"
                        onChange={handleEmailChange}
                    />
                </label>&nbsp;
                <br />
                <br />
                <label htmlFor="password">
                    Password:
                    &nbsp; <input
                        className="m-auto rounded-lg shadow-md w-[60%] flex-end"
                        autoComplete="new-password"
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Update Password"
                        onChange={handlePasswordChange}
                    />
                </label>&nbsp;
                <br />
                <br />
                <div className="flex justify-around flex-row">
                    <button className="hover:text-white" type="submit">Update Account</button>
                    <button className="hover:text-white" onClick={handleLogout}>Logout</button>
                </div>
            </form>
        </section>
    )



}


export default Account;