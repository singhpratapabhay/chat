

import React, { useState } from 'react';
import * as Yup from "yup"
import FormProvider from '../../components/hook-form/FormProvider'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeSlash, } from 'phosphor-react';
import { Stack } from '@mui/system';
import { Alert, Button, IconButton, InputAdornment, } from '@mui/material';
import {RHFTextField} from "../../components/hook-form";
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/slices/auth';
import { useSearchParams } from 'react-router-dom';

const NewPasswordForm = () => {
  console.log("hello")
  const [queryParameters] = useSearchParams();
 console.log(queryParameters.get("token"))
  const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);

    const NewPassowrdSchema =  Yup.object().shape({
        password: Yup.string().min(6,"password must be atleast 6 characters").required("Password is required"),
        passwordConfirm: Yup.string().required("Password is required").oneOf([Yup.ref('password'),null],'password must be same'),
    })
    const defaultValues = {
      password: "",
      passwordConfirm: ""
    }
    const methods = useForm({
        resolver: yupResolver(NewPassowrdSchema),
        defaultValues,
    });

    const {reset, setError, handleSubmit, formState: {errors, isSubmitSuccessful, isSubmitting}} = methods;

    const onSubmit = async (data)=>{
      console.log(data)
try{
dispatch(resetPassword({...data,token: queryParameters.get("token")}))
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
       
     
        <RHFTextField name="password" label="New Password" type={showPass? "text":"password"} InputProps={{endAdornment:(
            <InputAdornment>
            <IconButton onClick={()=>setShowPass(!showPass)}>
                {showPass?<Eye/>:<EyeSlash/>}
            </IconButton>
            </InputAdornment>
        )}} />
           <RHFTextField name="passwordConfirm" label="Confirm Password" type={showPass? "text":"password"} InputProps={{endAdornment:(
            <InputAdornment>
            <IconButton onClick={()=>setShowPass(!showPass)}>
                {showPass?<Eye/>:<EyeSlash/>}
            </IconButton>
            </InputAdornment>
        )}} />
          <Button fullWidth variant='contained'  size='large' type='submit' sx={{bgcolor:"text.primary", color:(theme)=>theme.palette.mode==="light"? "common.white": "grey.800",
    "&:hover": {
bgcolor: "text.primary",
color: (theme)=>theme.palette.mode==="light"? "common.white": "grey.800"
    }
  }}>
    submit
  </Button>
  </Stack> 

    </FormProvider>
  )
}

export default NewPasswordForm