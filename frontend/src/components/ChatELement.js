import { Avatar, Stack, Typography,Box,Badge, styled } from "@mui/material";

import { useTheme } from '@emotion/react';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
const ChatElement = ({ name, img, msg, time, unread, online}) => {
    const theme = useTheme();
  
    return (<Box sx={{
      width: "100%",
    
      borderRadius: 1,
      backgroundColor: theme.palette.mode==="light"? "#fff": theme.palette.background.default,
  
    }} p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" >
        <Stack direction="row" spacing={2} sx={{overflow:"hidden"}}>
          {online?  <StyledBadge overlap="circular"
        anchorOrigin={{ vertical:'bottom', horizontal:'right'}}
        variant="dot">
        <Avatar src={img} />
      </StyledBadge>: <Avatar src={img} />}
      
      <Stack spacing={0.2} >
          <Typography variant='subtitle2' sx={{textWrap: "nowrap"}}>
  {name}
          </Typography>
          <Typography variant='caption' sx={{textWrap: "nowrap"}}>
            {msg}
          </Typography>
        </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{fontWeight: 600}} variant='caption'>
            {time}
          </Typography>
          <Badge color='primary'  badgeContent={unread}></Badge>
        </Stack>
      </Stack>
     
  
    </Box>)
  }
  

  export default ChatElement;