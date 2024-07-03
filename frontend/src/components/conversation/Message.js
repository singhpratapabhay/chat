import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { Timeline, TxtMsg,MediaMsg,ReplyMsg, LinkMsg,DocMsg } from './MsgTypes'

const Message = ({menu}) => {
  return (
    <Box p={3} >
        <Stack spacing={3}>
        {Chat_History.map((val)=>{
            switch (val.type){
                case "divider":
                    return <Timeline el={val}/>;
                case "msg":
                    switch(val.subtype){
                        case "img":
                         return <MediaMsg el={val} menu={menu}/>;
                        case "doc":
                        return <DocMsg el={val} menu={menu}/>
                        case "link":
                           return <LinkMsg el={val} menu={menu}/>
                        case "reply":
                           return <ReplyMsg el={val} menu={menu}/>
                        default:
                          return  <TxtMsg el={val} menu={menu}/>
                    }
                default: 
                return <></>;
            }
        })}
        </Stack>

    </Box>
  )
}

export default Message