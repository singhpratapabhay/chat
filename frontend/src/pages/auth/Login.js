import { Stack, Typography, Link } from '@mui/material'
import React from 'react'
import {Link as RouterLink} from "react-router-dom"
import AuthSocial from '../../sections/auth/AuthSocial'
import LoginForm from '../../sections/auth/LoginForm'
const Login = () => {
  return (
   <>
   <Stack spacing={3} sx={{mb: 5, position: "relative"}}>
    <Typography variant='h4'>
        Login to Mun-C
    </Typography>
    <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
        <Typography variant='body2'>New User?</Typography>
        <Link to="/auth/register" component={RouterLink} variant="subtitle2">Create an account</Link>
    </Stack>
    {/* form  */}
    <LoginForm/>
    {/* auth social */}
    <AuthSocial/>
   </Stack>
   </>
  )
}

export default Login