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

    const handleSubmit = (event) => {

        const auth = getAuth();

        updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL
        }).then(function () {
            console.log('Display name and photo URL updated successfully');
        }).catch(function (error) {
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
        <section className="h-[100vh] w-[100vw] bg-[#A0A694] flex flex-col justify-center items-center">
                    <a href="/adminhome"><button>Back Home</button></a>

            <header className="text-bold text-center pt-[10vh] ">Update account</header>
            <form onSubmit={handleSubmit} className="border-double border-4 rounded-lg p-[15px] h-65vh md:max-h[60vh] m-auto lg:max-h-[55%] w-[50vw] md:max-w-[55vw] lg:max-w-[60vw] ">
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
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label>&nbsp;
                <br />
                <br />
                <label htmlFor="password">
                    Password:
                    &nbsp; <input
                        className="m-auto rounded-lg shadow-md w-[60%] flex-end"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>&nbsp;
                <br />
                <br />
                <div className="flex justify-around flex-row">
                    <button type="submit">Update Account</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </form>
        </section>
    )



}


export default Account;