import React, { useState } from 'react';
import * as Yup from "yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeSlash } from 'phosphor-react';
import { Stack } from '@mui/system';
import { Alert, Button, IconButton, InputAdornment, Link } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import {useDispatch} from "react-redux"
import { RegisterUser } from '../../redux/slices/auth';
const RegisterForm = () => {
    const [showPass, setShowPass] = useState(false);
        const dispatch = useDispatch();
    const RegisterSchema =  Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    })
    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "demo@tak.com",
        password: "demo1234"
    }
    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {reset, setError, handleSubmit, formState: {errors}} = methods;

    const onSubmit = async (data)=>{
try{
dispatch(RegisterUser(data))
}catch(error){
    console.log(error);
    reset();
    setError("afterSubmit", {
        ...error,
        message: error.message,
    })
}}
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
<Stack spacing={3}>
{!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
<Stack direction={{xs:"column", sm:"row"}} spacing={2}>
<RHFTextField name="firstName" label="First Name"/>
<RHFTextField name="lastName" label="Last Name"/>

</Stack>
<RHFTextField name="email" label="Email "/>
<RHFTextField name="password" label="Password" type={showPass? "text":"password"} InputProps={{endAdornment:(
            <InputAdornment>
            <IconButton onClick={()=>setShowPass(!showPass)}>
                {showPass?<Eye/>:<EyeSlash/>}
            </IconButton>
            </InputAdornment>
        )}}/>
        <Button fullWidth variant='contained'   size='large' type='submit' sx={{bgcolor:"text.primary", color:(theme)=>theme.palette.mode==="light"? "common.white": "grey.800",
    "&:hover": {
bgcolor: "text.primary",
color: (theme)=>theme.palette.mode==="light"? "common.white": "grey.800"
    }
  }}>
    Create Account
  </Button>
</Stack>

    </FormProvider>
  )
}

export default RegisterForm