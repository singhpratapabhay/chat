import React from "react";
import { Stack, Box} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
const Conversation = () => {
   
    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
            {/* chat header */}
          <Header/>   
            <Box width="100%" sx={{ flexGrow: 1, height:"100%", overflow:"hidden", overflowY:"scroll" }}>
            <Message menu={true}/>
            </Box>
           <Footer/>

        </Stack>
    )
}
export default Conversation