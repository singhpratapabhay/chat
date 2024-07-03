import React from "react";
import Chats from "./Chats";   
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/conversation/index.js"
import { useTheme } from "@emotion/react";
import Contact from "../../components/Contact.js";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages.js";
import StaredMessages from "../../components/StaredMessages.js";
const GeneralApp = ()=> {
  const theme = useTheme();
  const {sidebar} = useSelector((store)=> store.app);

  return (

    <Stack direction={"row"} width={"100%"}>
     <Chats/>
     <Box sx={{width: sidebar.open? "calc(100vw - 740px)":"calc(100vw - 420px)", height: "100%", backgroundColor: theme.palette.mode ==="light"?"#F0F4FA":theme.palette.background.default}}>
      <Conversation/>
     </Box>
     {sidebar.open && (()=>{
      switch (sidebar.type){
          case "CONTACT": 
          return <Contact/>
   
          case "STARED": 
          return <StaredMessages/>
       
          case "SHARED": 
          return <SharedMessages/>
          default: 
          break;


      }
     })() }
     
    </Stack>

  );
};

export default GeneralApp;
