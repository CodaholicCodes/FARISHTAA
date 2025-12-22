import { createSlice } from "@reduxjs/toolkit"
import { act } from "react";

const initialState={
    chatHistory:[],
    loading : false,
    error : null,
}

const patientSlice=createSlice({
    name : 'patient',
    initialState,
    reducers : {
        setChat : (state , action)=>{
       state.chatHistory=action.payload;
        },
        addMessage : (state,action)=>{
        state.chatHistory.push(action.payload);
        },
        setLoading : (state,action)=>{
       state.loading=action.payload;
        },
        setError : (state ,action)=>{
            state.error=action.payload;
        },
        clearChat : (state,action)=>{
       state.chatHistory=[];
        }
    }
});
export const {addMessage,setChat,setError,setLoading,clearChat}=patientSlice.actions;
const patientReducer=patientSlice.reducer;
export default patientReducer; 