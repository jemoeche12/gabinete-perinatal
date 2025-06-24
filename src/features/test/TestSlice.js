import { createSlice } from "@reduxjs/toolkit";


export const TestSlice = createSlice({
    name: "test",
    initialState: {
        value: {
            categoryTestSelected: "",
            testSelectedId: ""
        }
    },
    reducers: {
        setCategoryTestSelected(state, {payload}){
            state.value.categoryTestSelected = payload
        },
        setTestSelectedId(state, {payload}){
            state.value.testSelectedId = payload
        }
    }
})

export const { setCategoryTestSelected, setTestSelectedId } = TestSlice.actions
export default TestSlice.reducer