import React from 'react'
import { Link, Stack, Typography } from '@mui/material';
import {Link as RouterLink} from "react-router-dom";
import { CaretLeft } from 'phosphor-react';
import NewPasswordForm from '../../sections/auth/NewPasswordForm';

const NewPassowrd = () => {
  return (
    <>
    <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
<Typography variant='h3' paragraph sx={{mb: 0}}>
  Reset Password
</Typography>
<Typography sx={{color: "text.secondary", mt: 0, pt:0}}>
Please set your new password
</Typography>
<NewPasswordForm/>
<Link component={RouterLink} to="/auth/login" color={"inherit"} variant='subtitle2' sx={{mt: 1, mx:"auto", alignItems:"center", display: "inline-flex"}}>
<CaretLeft/>
Return to sign in
</Link>
</Stack>
        </>   
  )
}

export default NewPassowrd