import { createSlice } from "@reduxjs/toolkit";



export const TalleresSlice = createSlice({
    name: "talleres",
    initialState:{
        value:{
            talleresTitleSelected:"",
            tallerIdSelected: ""
        }
    },
    reducers:{
        setTalleresTitleSelected(state, {payload}){
            state.value.talleresTitleSelected = payload
        },
        setTallerIdSelected(state, {payload}){
            state.value.tallerIdSelected = payload
        },
        
    }
})

export const {setTallerIdSelected, setTalleresTitleSelected} = TalleresSlice.actions;
export default TalleresSlice.reducer;

