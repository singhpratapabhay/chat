import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";
const initialState = {

    isLoggedIn: false,
    token: "",
    isLoading: false,
    email: "",
    error: false,
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateIsLoading(state, action) {
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading;
        },
        logIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = ""
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email
        }

    }
})

export default slice.reducer;

//Log in

export function LoginUser(formvalues) {
    //formvalues => {email, password}
    return async (dispatch) => {
        await axios.post(`/auth/login`, {
            ...formvalues,
        }, {
            headers: {
                "Content-Type": "application/json",

            }
        }).then((res) => {

            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: res.data.token
            }));
            localStorage.setItem("user_id", res.data.user_id)

            dispatch(showSnackbar("success", res.data.message))
        }).catch((err) => {
            console.log(err)
            dispatch(showSnackbar("error", err.response.data.message))

        })
    }

}

export function LogoutUser() {
    return async (dispatch, getState) => {
        localStorage.removeItem("user_id")
        dispatch(slice.actions.signOut());

    }
}

export function forgotPassword(formvalues) {
    return async (dispatch, getState) => {
        await axios.post("/auth/forgot-password", { ...formvalues },
            {
                headers: {
                    "Content-Type": "application/json",
                }

            }
        ).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }
}
export function resetPassword(formvalues) {
    return async (dispatch, getState) => {
        console.log(formvalues)
        await axios.post("/auth/reset-password", { ...formvalues },
            {
                headers: {
                    "Content-Type": "application/json",
                }

            }
        ).then((res) => {
            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: res.data.token
            }))
        }).catch((error) => {
            console.log(error)
        })
    }
}


export function RegisterUser(formValues) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }))
        await axios.post("/auth/register", {
            ...formValues
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            dispatch(slice.actions.updateRegisterEmail({ email: formValues.email }))
            dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }))
        }).catch((err) => {
            dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }))
        }).finally(() => {
            if (!getState().auth.error) {
                window.location.href = "/auth/verify-password";

            }
        })
    }
}


export function VerifyEmail(formValues) {
    return async (dispatch, setState) => {
        console.log(formValues)
        await axios.post("/auth/verify", { ...formValues },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        ).then((res) => {
            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: res.data.token
            }))
            localStorage.setItem("user_id", res.data.user_id)
        }).catch((error) => {
            console.log(error)
        })
    }
}