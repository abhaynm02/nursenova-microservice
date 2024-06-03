import { createSlice } from "@reduxjs/toolkit";
export const authSlice= createSlice({
    name: "authslice",
    initialState :{
        email: "",
        token: "",
        role: "",
    },
    reducers:{
        setEmail:(state,action)=>{
            state.email =action.payload;
        },
        setToken:(state,action)=>{
            state.token =action.payload;
        },
        setRole:(state,action)=>{
            state.token=action.payload
        },
        logOut:(state)=>{
            state.name="";
            state.email="";
            state.role="";
        },
    },
});

export const {setEmail,setRole,setToken,logOut} = authSlice.actions;
export default authSlice.reducer;