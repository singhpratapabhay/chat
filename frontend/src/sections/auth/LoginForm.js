import React, { useState } from 'react';
import * as Yup from "yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeSlash, } from 'phosphor-react';
import { Stack } from '@mui/system';
import { Alert, Button, IconButton, InputAdornment, Link } from '@mui/material';
import {RHFTextField} from "../../components/hook-form";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {LoginUser} from "../../redux/slices/auth"
const   LoginForm = () => {
    const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
    const LoginSchema =  Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    })
    const defaultValues = {
        email: "demo@tak.com",
        password: "demo1234"
    }
    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {reset, setError, handleSubmit, formState: {errors, isSubmitSuccessful, isSubmitting}} = methods;

    const onSubmit = async (data)=>{
try{
  
  dispatch(LoginUser(data))
}catch(error){
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
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
       
        <RHFTextField name="email" label="Email address"  />
        <RHFTextField name="password" label="password" type={showPass? "text":"password"} InputProps={{endAdornment:(
            <InputAdornment>
            <IconButton onClick={()=>setShowPass(!showPass)}>
                {showPass?<Eye/>:<EyeSlash/>}
            </IconButton>
            </InputAdornment>
        )}} />
  </Stack> 
  <Stack alignItems={"flex-end"} sx={{my: 2}}>
<Link  variant='body2' color="inherit" underline='always' component={RouterLink} to="/auth/forgot-password">
    Forgot Password?
</Link>
  </Stack>
  <Button fullWidth variant='contained'  size='large' type='submit' sx={{bgcolor:"text.primary", color:(theme)=>theme.palette.mode==="light"? "common.white": "grey.800",
    "&:hover": {
bgcolor: "text.primary",
color: (theme)=>theme.palette.mode==="light"? "common.white": "grey.800"
    }
  }}>
    Login
  </Button>
    </FormProvider>
  )
}

export default LoginForm