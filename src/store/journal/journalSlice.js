import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSavingNote: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: ( state, action ) => {
            state.isSavingNote = action.payload;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSavingNote = true;
            state.messageSaved = '';
        },
        updateNote: ( state, action ) => {
            state.isSavingNote = false;
            state.notes = state.notes.map( note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            // mostrar mensasje de actualizacion
            state.messageSaved = `Nota actualizada correctamente`;
        },
        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSavingNote = false;
        },
        clearNotesLogout: ( state ) => {
            state.isSavingNote = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout } = journalSlice.actions;