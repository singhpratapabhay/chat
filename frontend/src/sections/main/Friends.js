import React, {useEffect, useState} from 'react'
import { Stack,Tabs,Tab,Dialog, DialogContent } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import { fetchFriendRequest, fetchFriends, fetchUsers } from '../../redux/slices/app';

const UsersList = ()=>{
    const dispatch = useDispatch();
useEffect(()=>{
dispatch(fetchUsers())
},[]);
const {users} = useSelector((state)=>state.app)
    return (<>
    {users.map((val, i)=>{

        //Todo => Render UserComponent
        return <></>
    })}
    </>)
}
const FriendsList = ()=>{
    const dispatch = useDispatch();
useEffect(()=>{
dispatch(fetchFriends())
},[]);
const {friends} = useSelector((state)=>state.app)
    return (<>
    {friends.map((val, i)=>{

        //Todo => Render UserComponent
        return <></>
    })}
    </>)
}
const FriendRequestList = ()=>{
    const dispatch = useDispatch();
useEffect(()=>{
dispatch(fetchFriendRequest())
},[]);
const {friendRequest} = useSelector((state)=>state.app)
    return (<>
    {friendRequest.map((val, i)=>{

        //Todo => Render UserComponent
        return <></>
    })}
    </>)
}
const Friends = ({ open, handleClose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
setValue(newValue);
    }
    return (
        <Dialog fullWidth maxWidth="xs" open={open} keepMounted onClose={handleClose} sx={{ p: 4 }}>
            <Stack p={2} sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />

                </Tabs>
            </Stack>
            {/* Dialog Content */}
<DialogContent>
    <Stack sx={{height: "100%"}}>
<Stack spacing={2.5}>
{(()=>{
switch (value) {
    case 0: //display all users
        return <UsersList/>
        case 1: //display all friends
        return <FriendsList/>
 
        case 2:  //display all friends request
        return <FriendRequestList/>
   

    default:
        break;
}
})()}
</Stack>
    </Stack>
</DialogContent>
        </Dialog>
    )
}

export default Friends