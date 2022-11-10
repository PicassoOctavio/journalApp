
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../auth/firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote,
    setActiveNote, 
    savingNewNote, 
    setNotes, 
    setSaving, 
    updateNote, 
    setPhotosToActiveNote, 
    deleteNoteById } from './journalSlice';


export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch( savingNewNote( true ) );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imagesUrls: [],
        }
        
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`));
        await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

        dispatch( savingNewNote( false ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const loadedNotes = await loadNotes( uid );

        dispatch( setNotes( loadedNotes ) );
    }
}

export const startSaveNote = (  ) => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToSave = { ...note };
        delete noteToSave.id;

        console.log({ noteToSave })
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await setDoc( docRef, noteToSave, { merge: true } );

        dispatch( updateNote( note ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        //await fileUpload( files[0] );
        const fileUploadPromises = [];

        for (const file of files) {
        
            fileUploadPromises.push( fileUpload( file ) ); 
        }

        const photoUrls = await Promise.all( fileUploadPromises );
        console.log({ photoUrls });

        dispatch( setPhotosToActiveNote( photoUrls ) );
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => { 
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docR = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docR );

        dispatch( deleteNoteById( note.id ) );
    }
}
