import { loginUser, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../auth/firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        console.log({ result });
        if ( !result.ok ) {
            return dispatch( logout( result.errorMessage) );
        }
        dispatch( login( result ) )
    } 
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        
        if ( !ok ) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, photoURL, displayName, email }));
        
    }
}

export const loginUserWithEmailAndPassword = ({ email, password }) => {

    return async (dispatch) => {

        dispatch( checkingCredentials() );

        const result = await loginUser({ email, password });
        console.log({ result })

        if ( !result.ok ) return ( dispatch( logout( { errorMessage: result.errorMessage } )));

        dispatch( login( result ));
    }
}

export const startLogout = () => {

    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout({ }) );
    }
}