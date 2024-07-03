import React, { useState } from 'react';
import { Stack, Box, Typography, IconButton, Tabs, Tab, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { updateSidebarType } from '../redux/slices/app';
import { CaretLeft } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS, SHARED_LINKS } from '../data';
import { DocMsg, LinkMsg } from './conversation/MsgTypes';

const SharedMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack direction={"column"} height={"100%"}>
        <Box sx={{ boxShadow: "0 0 2px rgba(0,0,0,0.25)", width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background }}>
          <Stack direction={"row"} sx={{ height: "100%", p: 2 }} alignItems={"center"} spacing={3}>
            <IconButton onClick={() => { dispatch(updateSidebarType("CONTACT")) }}><CaretLeft /></IconButton>
            <Typography variant='subtitle2'>Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs sx={{ px: 2, pt: 1 }} value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }} p={2} spacing={value===1?1:2}>
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6].map((val) => (
                      <Grid item xs={4} key={val}>
                        
                        
                          <img src={faker.image.avatar()} alt={faker.name.fullName()} style={{ width: '100%' }} />
                       
                      </Grid>
                    ))}
                  </Grid>
                );
              case 1:
                return (
                  SHARED_LINKS.map((val)=>{
                    return (<LinkMsg el={val}/>)
                  })
                );
              case 2:
                return (
                 SHARED_DOCS.map((val)=>{
                  return (<DocMsg el={val}/>)
                 })
                );
              default:
                return (
                  <Typography variant='body1'>
                    Invalid tab selection
                  </Typography>
                );
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
