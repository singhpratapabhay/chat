import { Box, Stack, Typography,Link,IconButton, useTheme, Divider,} from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search';
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { SimpleBarStyle } from '../../components/Scrollbar';
import { CallLogs,} from '../../data';
import { CallLogElement } from '../../components/CallElement';
import StartCall from '../../sections/main/StartCall';




const Call = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog]= useState(false);
  const handleCloseDialog= ()=>{
    setOpenDialog(false)
  }
  return (
<>    <Stack direction={"row"} sx={{width:"100%"}}>
{/* Left */}
<Box sx={{height:"100vh", overflow: "hidden", backgroundColor:(theme)=>theme.palette.mode==="light"?"#F8FAFF":theme.palette.background, width:320, boxShadow: "0 0 2px rgba(0,0,0,0.2)"}}>
<Stack p={3} spacing={2} sx={{maxHeight: "100vh"}}>
<Stack >
<Typography variant="h5">
   Call Logs
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
        Start Conversation
    </Typography>
    <IconButton onClick={()=>setOpenDialog(true)}>
        <Plus style={{color: theme.palette.primary.main}}/>
    </IconButton>
</Stack>
<Divider/>
</Stack>
<Stack direction="column" pl={3} spacing={2} sx={{flexGrow:1, overflowY:"scroll", height: "100%"}}>
         
         <SimpleBarStyle timeout={500} clickOnTrack="false"  spacing={2} >
         
         
                
                   <Stack spacing={2.4}>
                 
                  {/* Call Logs */}
                  {CallLogs.map((val)=>{
                    return ( <CallLogElement {...val}/>)
                  })}
                   
                   </Stack>
                  
                   </SimpleBarStyle>
                 </Stack>
</Box>
{/* Right */}

{/* TOdo => Reuse conversation  component*/}
{openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
    </Stack></>
  )
}

export default Call