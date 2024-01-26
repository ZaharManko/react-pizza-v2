import { createSlice } from "@reduxjs/toolkit";

const filterState = {
    totalPrice: 0,
    items: [],
    // count: 0,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState: filterState, // Додайте initialState
    reducers: {
        /*addItem: (state, action) => {
            state.items.push(action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price + sum
            }, 0)
        },*/

        addItem: (state, action) => {
            const findItem = state.items.find((item) => item.id === action.payload.id);
            if (findItem !== undefined) {
                findItem.count += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        moreItems: (state, action) => {
            if (state.items.id == action.payload.id) {
                state.items.count += 1
            }

        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            // Змінив цей рядок для повернення нового масиву
        },
        clearItems: (state) => {
            state.items = [];
        },
        plusItem: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.count += 1;
                state.totalPrice += item.price;
            }
        },
        minusItem: (state, action) => {
            const item = state.items.find((item) => item.id == action.payload)
            if (item.count > 0 && item) {
                item.count--
                state.totalPrice -= item.price
            }
        },
        clearBuscet: (state) => {
            const asking = window.confirm('are you sure you what to clear all items?')
            if (asking) {
                state.items = []
                state.totalPrice = 0
            }


        }

    }
});


export const { addItem, removeItem, clearItems, moreItems, plusItem, minusItem, clearBuscet } = cartSlice.actions;
export default cartSlice.reducer;