import React,{useState} from 'react';
import { Avatar, Box, Divider, IconButton, Stack, Switch, Menu, MenuItem } from "@mui/material";
import { useTheme,styled } from "@mui/material/styles";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data/index";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import { Profile_Menu } from '../../data/index';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../redux/slices/auth';
import {useDispatch} from "react-redux"

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 12,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
const getPath= (index)=>{
  switch(index){
    case 0:
      return "/app"
      case 1:
        return  "/group"
        case 2:
          return   "/call"
          case 3:
            return "/settings"
            default: 
            break;
  }
}
const getMenuPath =(index)=>{
  switch (index){
    case 0:
    return "/profile";
     case 1:
    return "/settings";
     case 2:
      //update token and set isAuth=false
    return "/auth/login";
    default: 
    break;
  }
}
const Sidebar = () => {
   
      const [selected, setSelected] = useState(0)
      const theme = useTheme();
    const {onToggleMode} = useSettings();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate=useNavigate();
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
   
      setAnchorEl(event.currentTarget);
    
      // navigate("")
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (

    <Box p={2} sx={{
      backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 4px 0px #00000040",
      height: "100vh", width: 100
    }}>
      <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={2} sx={{height:"100%"}}>
        <Stack alignItems="center" spacing={2}>

    
        <Box sx={{ backgroundColor: theme.palette.primary.main, height: 64, width: 64, borderRadius: 1.5 }} >
          <img src={logo} alt="logo" />
        </Box>
        <Stack direction="column" alignItems="center" sx={{ width: "max-content" }} spacing={2}>
          {Nav_Buttons.map((el) => {
            return (
              el.index === selected ?
                <Box p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} >
                  <IconButton key={el.index} sx={{ width: "max-content", color: "#fff" }} onClick={() => (setSelected(el.index), navigate(getPath(el.index)))}>
                    {el.icon}
                  </IconButton >
                </Box> : <IconButton key={el.index} sx={{ width: "max-content", color: theme.palette.mode==="light"? "#000": theme.palette.text.primary}} onClick={() => (setSelected(el.index), navigate(getPath(el.index)))}  >
                  {el.icon}
                </IconButton>
            )

          })}
          <Divider sx={{width:"48px"}}/>
          {selected===3 ?  <Box p={1} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} >
          <IconButton sx={{ width: "max-content", color: "#fff" }}>
            <Gear />
          </IconButton>  </Box>: <IconButton sx={{ width: "max-content",color: theme.palette.mode==="light"? "#000":theme.palette.text.primary}} onClick={() => (setSelected(3),navigate(getPath(3)))}>
            <Gear />
          </IconButton>}  
        </Stack>
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <AntSwitch onChange={()=>{onToggleMode()}} defaultChecked/>
        <Avatar id='basic-button' aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} src={faker.image.avatar()}/>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal:"right"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal:"left"
        }}
      >
        <Stack spacing={1} px={1}>
          {Profile_Menu.map((val,i)=>{
            return(<MenuItem onClick={()=>handleClick()}><Stack onClick={()=>{
              if(i===2){
                dispatch(LogoutUser())
              }else{
                navigate(getMenuPath(i))
              }
            }} sx={{width:100}} direction="row" alignItems="center" justifyContent="space-between"><span>{val.title}</span>{val.icon}</Stack></MenuItem>)
          })}

        </Stack>
      </Menu>
        </Stack>

      </Stack>

    </Box>
  )
}

export default Sidebar