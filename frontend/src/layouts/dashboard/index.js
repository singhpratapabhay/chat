import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { connectSocket, socket } from "../../socket";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/slices/app";


const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      }

      window.onload();
      if (!socket) {
        connectSocket(user_id);
      }

      //"new_friend_request"

      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({
          severity: "success",
          message: data.message
        }))
      })
      socket.on("request_accepted", (data) => {
        dispatch(showSnackbar({
          severity: "success",
          message: data.message
        }))
      })
      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({
          severity: "success",
          message: data.message
        }))
      });
    }
    return ()=>{
      socket.off("new_friend_request");
      socket.off("request_accepted");
      socket.off("request_sent");
    }
  }, [isLoggedIn, socket])
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />
  }

  const user_id = localStorage.getItem("user_id");

  return (
    <Stack direction="row">
      <Sidebar />
      <Outlet />
    </ Stack>
  );
};

export default DashboardLayout;
