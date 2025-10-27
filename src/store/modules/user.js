// 用戶相關狀態管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: 'user',
    // 數據狀態
    initialState:{
        token: getToken() || ''
    },
    // 同步修改方法
    reducers:{
        setToken(state, action) {
            state.token = action.payload
            // localstorage
            _setToken(action.payload)
        }
    }
})

// actionCreater
const { setToken } = userStore.actions

const userReducer = userStore.reducer

// 異步方法
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 發送異步請求
        const res = await request.post('/authorizations', loginForm)
        // 提交同步action進行token存入
        dispatch(setToken(res.data.token))
    }
}

export { fetchLogin, setToken }

export default userReducer
