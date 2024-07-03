import React, { useState } from 'react'
import { Stack, Box, IconButton, Typography, Avatar, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Bell, CaretLeft, Image, Info,  Keyboard, Lock, LockKey, Note, Pencil } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import Shortcuts from '../../sections/settings/Shortcuts';
const Settings = () => {
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const theme = useTheme();
  const list = [{
    Key:0,
    icon: <Bell size={20}/>,
    title: "Notifications",
    onclick: ()=>{},
  },
  {
    Key:1,
    icon: <Lock size={20}/>,
    title: "Privacy",
    onclick: ()=>{},
  },
  {
    Key:2,
    icon: <LockKey size={20}/>,
    title: "Security",
    onclick: ()=>{},
  },
  {
    Key:3,
    icon: <Pencil size={20}/>,
    title: "Theme",
    onclick: ()=>{},
  },
  {
    Key:4,
    icon: <Image size={20}/>,
    title: "Chat Wallpaper",
    onclick: ()=>{},
  },
  {
    Key:5,
    icon: <Note size={20}/>,
    title: "Request Account Info",
    onclick: ()=>{},
  },
  {
    Key:6,
    icon: <Keyboard size={20}/>,
    title: "Keyboard Shortcuts",
    onclick: ()=>{setOpenShortcuts(true)},
  },
  {
    Key:7,
    icon: <Info size={20}/>,
    title: "Help",
    onclick: ()=>{},
  }];
  return (<>
   <Stack direction={"row"} sx={{ width: "100%" }}>
      <Box sx={{ overflowY: "auto", height: "100vh", width: 320, boxShadow:"0 0 2px rgba(0,0,0,0.25)",backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background }}>
<Stack p={4} spacing={5}>
<Stack direction={"row"} alignItems={"center"} spacing={2}>
<IconButton>
  <CaretLeft size={24} color='#4B4B4B'/>
</IconButton>
<Typography  sx={{fontSize:"28px !important"}} variant='h3'>
  Settings
</Typography>
</Stack>
<Stack direction={"row"} spacing={3}>
<Avatar sx={{height: 56, width: 56}} src={faker.image.avatar()} alt={faker.name.fullName()} />
<Stack spacing={0.5}>
<Typography variant='article'>
{faker.name.fullName()}
</Typography>
<Typography variant='body2'>
{faker.random.words()}
</Typography>
</Stack>

</Stack>
<Stack spacing={4}>
{list.map(({Key, icon, title, onclick})=>{
  return(
  <>
  <Stack onClick={onclick} sx={{cursor: "pointer" }} spacing={2}>
<Stack direction={"row"} spacing={2} alignItems={"center"}>
  {icon}
  <Typography variant='body2'>
    {title}
  </Typography>
</Stack>
{Key !==7 && <Divider/>}
  </Stack>
  </>)
})}
</Stack>
</Stack>

      </Box>
    </Stack>
    {openShortcuts &&  <Shortcuts open={openShortcuts} handleClose={()=>{setOpenShortcuts(false)}} />}
   
  </>
   
  )
}

export default Settings