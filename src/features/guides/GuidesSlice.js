const { createSlice } = require("@reduxjs/toolkit");


const GuidesSlice = createSlice({
    name: "guides",
    initialState: {
        guideCategorySelected: "",
        guideSelectedId: ""
    }
    ,
    reducers: {
        setGuideCategorySelected(state, {payload}){
            state.guideCategorySelected = payload
        },
        setGuideSelectedId(state, {payload}){
            state.guideSelectedId = payload
        } 
    }
})

export const { setGuideCategorySelected, setGuideSelectedId } = GuidesSlice.actions
export default GuidesSlice.reducer
