import { createSlice } from "@reduxjs/toolkit";

const filterState = {
    categoriesId: 0,
    currentPage: 1,
    sort: {
        name: 'популярності', sortProperty: 'rating'
    }

}

const filterSlice = createSlice({
    name: 'filter',
    initialState: filterState,
    reducers: {
        setCategoryId: (state, action) => {
            // console.log('action:  ', action)
            state.categoriesId = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            const [sort, currentPage, categoriesId,] = action.payload;
            //console.log('action from redux:', sort)
            state.currentPage = Number(currentPage)
            state.categoriesId = Number(categoriesId)
            state.sort.sortProperty = sort
        }
    }
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;