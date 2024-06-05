import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    // create id / signUp
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login id 
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout 
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false)

            //if user exist then issue a token
            // if (currentUser) {
            //     axios.post('https://volunteer-website-server.vercel.app/jwt', loggedUser, {
            //         withCredentials: true
            //     })
            //         .then((res) => {
            //             setUser(currentUser);
            //             setLoading(false);
            //             console.log('token response', res.data)
            //         })
            // }
            // else{
            //     setUser(null);
            //     axios.post('https://volunteer-website-server.vercel.app/logout',loggedUser,{
            //         withCredentials:true
            //     })
            //     .then(res=>{
            //         setLoading(false);
            //         console.log(res.data)
            //     })
            // }
        });
        return () => {
            unsubscribe();
            setLoading(false)

        }
    }, [])

    // google login 
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }



    // update id 
    const updateUserId = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }


    const authInfo = {
        createUser,
        signIn,
        logOut,
        user,
        loading,
        setLoading,
        signInWithGoogle,
        updateUserId
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;