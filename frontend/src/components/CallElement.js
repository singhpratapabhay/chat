import React from 'react';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';
import { StyledBadge } from './StyledBadge';
import { ArrowDownLeft, ArrowURightUp, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react';
const CallLogElement = ({ img, online, name,incoming, missed }) => {
    return (
        <>
            <Box sx={{ width: "100%", borderRadius: 1, backgroundColor: (theme) => theme.palette.mode === "light" ? "#fff" : theme.palette.background.default, }} p={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
                        {online ? <StyledBadge overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot">
                            <Avatar src={img} alt={name} />
                        </StyledBadge> : <Avatar src={img} alt={name} />}
                        <Stack spacing={0.2} >
                            <Typography variant='subtitle2' sx={{ textWrap: "nowrap" }}>
                                {faker.name.fullName()}
                            </Typography>
                            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                              {incoming?  <ArrowDownLeft color={missed? "red": "green"} />: <ArrowUpRight color={missed? "red": "green"}/>} 
                              <Typography variant='caption'>Yesterday 21:24</Typography>
                            </Stack>
                        </Stack>


                        {/* <Typography variant='caption' sx={{textWrap: "nowrap"}}>
            {msg}
          </Typography> */}
                    </Stack>
                    <IconButton>
                    <Phone color="green"/>
                    </IconButton>
                 
                </Stack>

            </Box>
        </>
    )
}
const CallElement = ({ img, online, name,incoming, missed }) => {
    return (
        <>
          <Box sx={{ width: "100%", borderRadius: 1, backgroundColor: (theme) => theme.palette.mode === "light" ? "#fff" : theme.palette.background.default, }} p={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
                        {online ? <StyledBadge overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot">
                            <Avatar src={img} alt={faker.name.fullName()} />
                        </StyledBadge> : <Avatar src={img} alt={name}  />}
                        <Stack spacing={0.2} >
                            <Typography variant='subtitle2' sx={{ textWrap: "nowrap" }}>
                                {name}
                            </Typography>
                       
                        </Stack>


                        {/* <Typography variant='caption' sx={{textWrap: "nowrap"}}>
            {msg}
          </Typography> */}
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                    <IconButton>
                    <Phone color="green"/>
                   
                    </IconButton>
                    <IconButton>
                    <VideoCamera color="green" />
                    </IconButton>
                    </Stack>
                  
                 
                </Stack>

            </Box>
        </>
    )
}

export { CallElement, CallLogElement }