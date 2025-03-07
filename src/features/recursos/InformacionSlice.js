import { createSlice } from '@reduxjs/toolkit'


export const InformacionSlice = createSlice({
    name: 'informacion',
    initialState: {
        value:{
            categorySelected: '',
            ItemIdSelected: '',
        },
    },
    reducers:{
        setCategorySelected: (state, {payload}) => {
            state.value.categorySelected = payload;
        },
        setIdSelected: (state, {payload}) => {
            state.value.ItemIdSelected = payload;
        }
    }
})


export const { setCategorySelected, setIdSelected } = InformacionSlice.actions;
export default InformacionSlice.reducer;