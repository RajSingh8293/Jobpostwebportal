/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"



export const STATUS = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})

const wishlistSlice = createSlice({
    name: 'whishListItems',
    initialState: {
        favorateItems: localStorage.getItem('favorateItems')
            ? JSON.parse(localStorage.getItem('favorateItems'))
            : [],
        status: STATUS.IDLE,
    },
    reducers: {
        addTowhistList: (state, action) => {
            const Items = action.payload
            const existItem = state.favorateItems.find((item) => item._id === Items._id)
            if (!existItem) {
                state.favorateItems.push({ ...action.payload })
            }
            localStorage.setItem('favorateItems', JSON.stringify(state.favorateItems))
            toast.success('Item add to whislist')
        },
        removeFromWhishList: (state, action) => {
            const removeData = state.favorateItems.filter(
                (item) => item._id !== action.payload._id,
            )
            state.favorateItems = removeData
            localStorage.setItem('favorateItems', JSON.stringify(state.favorateItems))
            toast.success('Remove from wishlist')
        },

        clearWishList: (state, action) => {
            state.favorateItems = []
            localStorage.clear('favorateItems')
            toast.success('Clear wishlist')
        }
    }
})

export const { addTowhistList, removeFromWhishList, clearWishList } = wishlistSlice.actions
export default wishlistSlice.reducer