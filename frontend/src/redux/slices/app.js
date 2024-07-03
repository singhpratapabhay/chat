import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  snackBar: {
    open: false,
    severity: null,
    message: null,
  },
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, SHARED, STARRED
  },
  users: [],
  friends: [],
  friendRequest: []
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle Sidebar
    toggleSidebar(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    // Update Sidebar Type
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    // Open Snackbar
    openSnackBar(state, action) {
      state.snackBar.open = action.payload.open;
      state.snackBar.severity = action.payload.severity;
      state.snackBar.message = action.payload.message;
    },
    // Close Snackbar
    closeSnackbar(state) {
      state.snackBar.open = false;
      state.snackBar.severity = null;
      state.snackBar.message = null;
    },

    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequest(state, action) {
      state.friendRequest = action.payload.friendRequest;
    }

  },
});

export default slice.reducer;

// Action Creators
export function ToggleSidebar() {
  return async (dispatch) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function updateSidebarType(type) {
  return async (dispatch) => {
    dispatch(slice.actions.updateSidebarType({ type }));
  };
}

export function showSnackbar(severity, message) {
  return async (dispatch) => {
    dispatch(slice.actions.openSnackBar({ severity, message, open: true }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000);
  };
}

export const closeSnackbar = () => async (dispatch) => {
  dispatch(slice.actions.closeSnackbar());
};

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`
      }
    }).then((res) => {
      console.log(res)
      dispatch(slice.actions.updateUsers({
        users: res.data.data
      }))
    }).catch((err) => {
      console.log(err)
    })
  }
}
export const fetchFriends = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friends", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`
      }
    }).then((res) => {
      console.log(res)
      dispatch(slice.actions.updateFriends({
        friends: res.data.data
      }))
    }).catch((err) => {
      console.log(err)
    })
  }
}
export const fetchFriendRequest = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friend-requests", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`
      }
    }).then((res) => {
      console.log(res)//checkaginshduiogfuwetfi7  GBFO7ITEG FB7IO
      dispatch(slice.actions.updateFriendRequest({
        friendRequest: res.data.data
      }))
    }).catch((err) => {
      console.log(err)
    })
  }
}
