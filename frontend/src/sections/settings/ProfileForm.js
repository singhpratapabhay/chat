import React, { useCallback, useState } from 'react';
import * as Yup from "yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/system';
import { Alert, Button, IconButton, InputAdornment, Link } from '@mui/material';
import { RHFTextField } from "../../components/hook-form";
import { Link as RouterLink } from 'react-router-dom';
const ProfileForm = () => {
    const LoginSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().required("About is required"),
        avatarUrl: Yup.string().required("Avatar is required").nullable(true),

    })
    const defaultValues = {
        name: "",
        about: ""
    }
    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const { reset,watch, control,setValue, setError, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitting } } = methods;
const values = watch();
const handleDrop=useCallback((acceptedFiles)=>{
const file = acceptedFiles[0];
const newFile = Object.assign(file,{
preview: URL.createObjectUrl(file)
});
if(file){
    setValue("avatarUrl", newFile, {shouldValidate: true})//when ever new file is selected then validates will run again
}
}, [setValue])
    const onSubmit = async (data) => {
        try {
            //submit
            console.log("data", data)
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            })
        }
    }
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
            
                <RHFTextField name="name" label="Name" helperText={"This name is visible to your contacts"}/>
                <RHFTextField name="about" label="About"  multiline rows={3} maxRows={5}/>
             

            </Stack>
<Stack justifyContent={"flex-end"} direction={"row"}>
    <Button color='primary' size='large' type='submit' variant='outlined'>Save</Button>
</Stack>
            </Stack>
         

        </FormProvider>
    )
}

export default ProfileForm