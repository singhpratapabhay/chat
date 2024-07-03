import React, { useState } from 'react'
import { Box, IconButton, Stack, Typography, useTheme, Button, Divider, } from '@mui/material'
import { ArchiveBox, CircleDashed, HandPalm, MagnifyingGlass, User } from 'phosphor-react';
import { SimpleBarStyle } from "../../components/Scrollbar"
import { ChatList } from '../../data';

import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search';
import ChatElement from '../../components/ChatELement';
import Friends from '../../sections/main/Friends';




const Chats = () => {
  const [ openDialog, setOpenDialog] = useState(false)
  const theme = useTheme();
  const handleCloseDialog = ()=>{
    setOpenDialog(false)
  }
  const handleOpenDialog = ()=>{
    setOpenDialog(true)
  }
  return (
    <>
  
    <Box sx={{ backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, width: 320, position: "relative", boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" }}>
      <Stack p={2} spacing={2} sx={{ height: "100vh" }}>

        <Stack direction="row" alignItems="center" justifyContent="space-between" >
          <Typography variant='h5'>
            Chat
          </Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton onClick={()=>{
              handleOpenDialog()
            }}>
              <User size={32} />
            </IconButton>
            <IconButton>
              <CircleDashed size={32} />
            </IconButton>
          </Stack>

        </Stack>
        <Stack sx={{ width: "100%" }} >
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color='#709CE6' />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' />
          </Search>
        </Stack>
        <Stack spacing={1} >
          <Stack direction="row" alignItems="center" spacing={1.5} >
            <ArchiveBox size={24} />
            <Button>
              Archived
            </Button>

          </Stack>
          <Divider />
        </Stack>
        <Stack direction="column" spacing={2} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>

          <SimpleBarStyle timeout={500} clickOnTrack="false" spacing={2} >



            <Stack spacing={2.4}>
              <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList.filter((el) => {
                return (el.pinned === true)
              }).map((el) => {
                return (<ChatElement {...el} />)
              })}

            </Stack>
            <Stack spacing={2.4} mt={1}>
              <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                All Chats
              </Typography>
              {ChatList.filter((el) => {
                return (el.pinned !== true)
              }).map((el) => {
                return (<ChatElement {...el} />)
              })}

            </Stack>

          </SimpleBarStyle>
        </Stack>

      </Stack>


    </Box>
    {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  )
}

export default Chats
