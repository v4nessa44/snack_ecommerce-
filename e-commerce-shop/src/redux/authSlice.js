import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        login: false,
        id:"",
        name: "",
        email:""
    },
    reducers: {
        doLogin(state, action) {
            state.login = action.payload.login;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;    
        }, 

        doLogOut(state) {
            state.login = false;
            state.id = "";
            state.name = "";
            state.email = "";
        }
    },
});

export default AuthSlice
export const { doLogin, doLogOut } = AuthSlice.actions