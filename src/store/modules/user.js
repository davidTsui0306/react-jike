// 用戶相關狀態管理

import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: 'user',
    // 數據狀態
    initialState:{
        token: ''
    },
    // 同步修改方法
    reducers:{
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

// actionCreater
const { setToken } = userStore.actions

const userReducer = userStore.reducer

export { setToken }

export default userReducer
