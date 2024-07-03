import React from 'react';
import * as Yup from "yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/system';
import { Alert, Button,} from '@mui/material';
import {RHFTextField} from "../../components/hook-form";
import { Link as RouterLink } from 'react-router-dom';
import { forgotPassword } from '../../redux/slices/auth';
import {useDispatch} from "react-redux";
const ResetPasswordForm = () => {

const dispatch = useDispatch();
    const ResetPasswordSchema =  Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
      
    })
    const defaultValues = {
        email: "demo@tak.com",
        password: "demo1234"
    }
    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });

    const {reset, setError, handleSubmit, formState: {errors, isSubmitSuccessful, isSubmitting}} = methods;

    const onSubmit = async (data)=>{
try{
dispatch(forgotPassword(data))
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
       
  </Stack> 
 
  <Button fullWidth variant='contained'  size='large' type='submit'  sx={{bgcolor:"text.primary",mt:3, color:(theme)=>theme.palette.mode==="light"? "common.white": "grey.800",
    "&:hover": {
bgcolor: "text.primary",
color: (theme)=>theme.palette.mode==="light"? "common.white": "grey.800"
    }
  }}>
    Send Request
  </Button>
    </FormProvider>
  )
}

export default ResetPasswordForm