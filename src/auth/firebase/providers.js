import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        //const credential = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        console.log({ error })
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid } = resp.user;

        console.log({resp})
        await updateProfile( FirebaseAuth.currentUser, { displayName } )

        return {
            ok: true,
            uid, displayName, email,
        }


    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const loginUser = async ({ email, password }) => {
    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        console.log({uid});

        return {
            ok: true,
            uid, photoURL, displayName,
        }
    } catch (error) {
        console.log({ error })
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const logoutFirebase = async() => {
    
    return await FirebaseAuth.signOut();
}