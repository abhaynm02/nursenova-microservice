import { createSlice } from "@reduxjs/toolkit";
export const authSlice= createSlice({
    name: "authslice",
    initialState :{
        email: null,
        token: null,
        role: null,
    },
    reducers:{
        setEmail:(state,action)=>{
            state.email =action.payload;
        },
        setToken:(state,action)=>{
            state.token =action.payload;
        },
        setRole:(state,action)=>{
            state.role=action.payload
        },
        logOut:(state)=>{
            state.token=null;
            state.email=null;
            state.role=null;
        },
    },
});

export const {setEmail,setRole,setToken,logOut} = authSlice.actions;
export default authSlice.reducer;