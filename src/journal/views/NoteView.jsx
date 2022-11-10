import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { ImageGallery } from '../components'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';

export const NoteView = () => {

    const dispatch =  useDispatch();
    const { active: note, messageSaved, isSavingNote } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( note );
    const fileInputRef = useRef();

    const dateString = useMemo( () => {
        const stringDate = new Date( date ).toUTCString();
        return stringDate;
    }, [date] );

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [formState])

    useEffect(() => {
        if ( messageSaved.length > 0 ){
            Swal.fire('nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch( startUploadingFiles( target.files ) )
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }
    
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid>
            <Grid item>

                <input 
                    type='file'
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />
                <IconButton
                    color='primary'
                    disabled={ isSavingNote }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadFileOutlined />
                </IconButton>

                <Button 
                    onClick={ onSaveNote }
                    disabled={ isSavingNote }
                    color="primary" 
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            
            <Grid container justifyContent="end">
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery 
                images={ note.imageUrls }
            />

        </Grid>
    )
}
