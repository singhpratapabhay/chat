import { Box, Stack, Typography,Link,IconButton, useTheme, Divider,} from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search';
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { SimpleBarStyle } from '../../components/Scrollbar';
import { ChatList } from '../../data';
import ChatElement from '../../components/ChatELement';
import CreateGroup from '../../sections/main/CreateGroup';



const Group = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog]= useState(false);
    const handleCloseDialog= ()=>{
      setOpenDialog(false)
    }
  return (
    <>
    <Stack direction={"row"} sx={{width:"100%"}}>
{/* Left */}
<Box sx={{height:"100vh", overflow: "hidden", backgroundColor:(theme)=>theme.palette.mode==="light"?"#F8FAFF":theme.palette.background, width:320, boxShadow: "0 0 2px rgba(0,0,0,0.2)"}}>
<Stack p={3} spacing={2} sx={{maxHeight: "100vh"}}>
<Stack >
<Typography variant="h5">
    Groups
</Typography>
</Stack>
<Stack width={"100%"}>
<Search>
            <SearchIconWrapper>
              <MagnifyingGlass color='#709CE6' />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' />
          </Search>
</Stack>
<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
    <Typography variant='subtitle2' component={Link}>
        Create New Group
    </Typography>
    <IconButton onClick={()=>setOpenDialog(true)}>
        <Plus style={{color: theme.palette.primary.main}}/>
    </IconButton>
</Stack>
<Divider/>
</Stack>
<Stack direction="column" spacing={2} sx={{flexGrow:1, overflowY:"scroll", height: "100%"}}>
         
         <SimpleBarStyle timeout={500} clickOnTrack="false"  spacing={2} >
         
         
                
                   <Stack spacing={2.4}>
                     <Typography variant='subtitle2' sx={{color:"#676767"}}>
                       Pinned
                     </Typography>
                     {ChatList.filter((el)=>{
                       return( el.pinned===true)
                     }).map((el)=>{
                       return(<ChatElement {...el}/>)
                     })}
                     <Typography variant='subtitle2' sx={{color:"#676767"}}>
                       All Groups
                     </Typography>
                     {ChatList.filter((el)=>{
                       return( el.pinned!==true)
                     }).map((el)=>{
                       return(<ChatElement {...el}/>)
                     })}
                    
                   </Stack>
                   <Stack spacing={2.4} mt={1}>
                    
                   </Stack>
                  
                   </SimpleBarStyle>
                 </Stack>
</Box>
{/* Right */}

{/* TOdo => Reuse conversation  component*/}

    </Stack>
{openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  )
}

export default Group