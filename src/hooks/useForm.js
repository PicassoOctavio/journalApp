import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect( () => {
        setFormState( initialForm );
    }, [initialForm])

    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])

    const createValidators = () => {

        // lo que voy a setear en setFormValidation (campos checkeados)
        const formCheckedValues = {};
        for( const formField of Object.keys( formValidations )) {
            
            // obtengo la funcion de validacion y el mensaje de error de formValidations por cada campo
            const [ fn, errorMessage ] = formValidations[formField];

            // creo una nueva propiedad con el nombre del campo + Valid
            // envio null si esta bien y sino el mensaje de error
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}