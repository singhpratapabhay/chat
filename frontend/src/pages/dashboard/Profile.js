import React, { useState } from 'react'
import { Box, Divider, IconButton, Stack, Link, Typography, useTheme } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search'
import { CaretLeft, MagnifyingGlass, Plus } from 'phosphor-react'
import { SimpleBarStyle } from '../../components/Scrollbar'
import ProfileForm from '../../sections/settings/ProfileForm'

const Profile = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    return (
        <>  <Stack direction={"row"} sx={{ width: "100%" }}>
            {/* Left */}
            <Box sx={{ height: "100vh", overflow: "hidden", backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background, width: 320, boxShadow: "0 0 2px rgba(0,0,0,0.2)" }}>
                <Stack p={4} spacing={5}>
                    {/* Header */}
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <IconButton>
                            <CaretLeft size={24} color='#4B4B4B' />
                        </IconButton>
                        <Typography variant='h5'>
                            Profile
                        </Typography>
                    </Stack>
                  <ProfileForm/>
                </Stack>

            </Box>
            {/* Right */}

            {/* TOdo => Reuse conversation  component*/}

        </Stack></>
    )
}

export default Profile