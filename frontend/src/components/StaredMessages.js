


import React from 'react';
import { Stack, Box, Typography, IconButton,} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { updateSidebarType } from '../redux/slices/app';
import { CaretLeft } from 'phosphor-react';


import Message from './conversation/Message';

const StaredMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();


  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack direction={"column"} height={"100%"}>
        <Box sx={{ boxShadow: "0 0 2px rgba(0,0,0,0.25)", width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background }}>
          <Stack direction={"row"} sx={{ height: "100%", p: 2 }} alignItems={"center"} spacing={3}>
            <IconButton onClick={() => { dispatch(updateSidebarType("CONTACT")) }}><CaretLeft /></IconButton>
            <Typography variant='subtitle2'>Stared Messages</Typography>
          </Stack>
        </Box>
       
        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }} p={2} spacing={2}>
            <Message/>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StaredMessages;
